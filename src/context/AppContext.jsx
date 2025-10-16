import { createContext, useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";

const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // --- CART OPERATIONS ---
  const addToCart = (item) => {
    const existing = cartItems.find((c) => c.name === item.name);
    if (existing) {
      setCartItems(
        cartItems.map((c) =>
          c.name === item.name ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) =>
    setCartItems(cartItems.filter((i) => i.itemId !== itemId));

  const updateQuantity = (itemId, newQty) =>
    setCartItems(
      cartItems.map((i) => (i.itemId === itemId ? { ...i, quantity: newQty } : i))
    );

  const clearCart = () => setCartItems([]);

  // --- FETCH DATA FROM BACKEND ---
  const fetchPendingOrderData = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_PENDING_ORDERS);
      if (res.status === 200) setOrderData(res.data || []);
      else setOrderData([]);
    } catch (err) {
      console.error("Error fetching pending orders:", err);
      setOrderData([]);
    }
  };

//   const fetchAllItems = async () => {
//     try {
//       const res = await axiosConfig.get(API_ENDPOINTS.GET_ITEMS);
//       if (res.status === 200) setItemsData(res.data || []);
//       else setItemsData([]);
//     } catch (err) {
//       console.error("Error fetching items:", err);
//       setItemsData([]);
//     }
//   };

//   const fetchAllCategories = async () => {
//     try {
//       const res = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORIES);
//       if (res.status === 200) setCategories(res.data || []);
//       else setCategories([]);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       setCategories([]);
//     }
//   };

  // --- INITIAL LOAD ---
  useEffect(() => {
    // fetchAllCategories();
    // fetchAllItems();
    fetchPendingOrderData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
    itemsData,
    setItemsData,
    orderData,
    setOrderData,
    fetchPendingOrderData,
    addToCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
