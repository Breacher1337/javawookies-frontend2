import { createContext, useEffect, useState } from "react"
// import axiosConfig from "../util/axiosConfig.js";
// import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import {assets} from "../assets/assets.js";
import axiosConfig from "../util/axiosConfig.js";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";

const AppContext =  createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [cartItems, setCartItems] = useState([]);


    const sampleItemsData = [
        // Classic Cookies
        { itemId: 1, categoryId: 1, name: 'Choco Chip Cookie', price: 120, imageUrl: assets.item },
        { itemId: 2, categoryId: 1, name: 'Oatmeal Raisin Cookie', price: 100, imageUrl: assets.item },
        { itemId: 3, categoryId: 1, name: 'Double Chocolate Cookie', price: 130, imageUrl: assets.item },
        { itemId: 4, categoryId: 1, name: 'Peanut Butter Cookie', price: 110, imageUrl: assets.item },
        { itemId: 5, categoryId: 1, name: 'Macadamia Nut Cookie', price: 140, imageUrl: assets.item },

        // Premium Cookies
        { itemId: 6, categoryId: 2, name: 'Matcha Cookie', price: 125, imageUrl: assets.item },
        { itemId: 7, categoryId: 2, name: 'Red Velvet Cookie', price: 135, imageUrl: assets.item },
        { itemId: 8, categoryId: 2, name: 'Salted Caramel Cookie', price: 150, imageUrl: assets.item },

        // Vegan Cookies
        { itemId: 9, categoryId: 3, name: 'White Chocolate Cookie', price: 115, imageUrl: assets.item },
        { itemId: 10, categoryId: 3, name: 'Mocha Cookie', price: 120, imageUrl: assets.item },

        // Nutty Cookies
        { itemId: 11, categoryId: 4, name: 'Coconut Crunch Cookie', price: 110, imageUrl: assets.item },
        { itemId: 12, categoryId: 4, name: 'Brownie Cookie', price: 130, imageUrl: assets.item },

        // Chocolate Cookies
        { itemId: 13, categoryId: 5, name: 'Cinnamon Swirl Cookie', price: 100, imageUrl: assets.item },
        { itemId: 14, categoryId: 5, name: 'Mint Choco Cookie', price: 125, imageUrl: assets.item },

        // Seasonal Specials
        { itemId: 15, categoryId: 6, name: 'Honey Butter Cookie', price: 120, imageUrl: assets.item },
        { itemId: 16, categoryId: 6, name: 'Rocky Road Cookie', price: 145, imageUrl: assets.item },
        { itemId: 17, categoryId: 6, name: 'S’mores Cookie', price: 140, imageUrl: assets.item },

        // Mini Bites
        { itemId: 18, categoryId: 7, name: 'Espresso Cookie', price: 130, imageUrl: assets.item },
        { itemId: 19, categoryId: 7, name: 'Strawberry Cookie', price: 125, imageUrl: assets.item },
        { itemId: 20, categoryId: 7, name: 'Banana Walnut Cookie', price: 135, imageUrl: assets.item },
    ];

    const sampleCategoriesData = [
        { categoryId: 1, name: 'Cookies', price: 120 },
        { categoryId: 2, name: 'Drinks', price: 140 },
        { categoryId: 3, name: 'Teas', price: 130 },
        { categoryId: 4, name: 'Cakes', price: 135 },
        { categoryId: 5, name: 'Pastries', price: 125 },
        { categoryId: 6, name: 'Best Seller', price: 150 },
        { categoryId: 7, name: 'Non-Tea', price: 100 },
    ];

    const sampleOrderData = [
        { orderId: "ORD001", items: ["Cookie 1", "Cookie 2"], amount: 320, status: "Pending", date: "2025-10-10" },
        { orderId: "ORD002", items: ["Cookie 1", "Cookie 2"], amount: 320, status: "Pending", date: "2025-10-10" },
        { orderId: "ORD003", items: ["Cookie 1", "Cookie 2"], amount: 320, status: "Pending", date: "2025-10-10" },
        { orderId: "ORD004", items: ["Cookie 1", "Cookie 2"], amount: 320, status: "Pending", date: "2025-10-10" },
        { orderId: "ORD005", items: ["Cookie 1", "Cookie 2"], amount: 320, status: "Pending", date: "2025-10-10" },
        { orderId: "ORD006", items: ["Cookie 1", "Cookie 2"], amount: 320, status: "Pending", date: "2025-10-10" },
    ];

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.name === item.name ? {  ...cartItem, quantity: cartItem.quantity + 1} : cartItem
            ));
        } else {
            setCartItems([...cartItems, {...item, quantity: 1}]);
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    }

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? {...item, quantity: newQuantity} : item));
    }

    const fetchPendingOrderData = async () => {
        const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_PENDING_ORDERS);
        if (response.status === 200) {
            setOrderData(response.data);
        }
    }

    useEffect(() => {
        async function loadData() {
            // const categoriesDataResponse = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORIES);
            // const itemDataResponse = await axiosConfig.get(API_ENDPOINTS.GET_ITEMS);
            // const orderDataResponse = await axiosConfig.get(API_ENDPOINTS.GET_ALL_PENDING_ORDERS);
            // setCategories(categoriesDataResponse.data);
            // setItemsData(itemDataResponse.data);
            // setOrderData(orderDataResponse.data);
            setItemsData(sampleItemsData);
            setCategories(sampleCategoriesData);
            setOrderData(sampleOrderData);
        }
        loadData();
    }, []);

    const clearCart = () => {
        setCartItems([]);
    }

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
        clearCart
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}

export default AppContext;