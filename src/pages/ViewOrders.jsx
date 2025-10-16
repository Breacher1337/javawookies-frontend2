import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext.jsx";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { toast } from "react-toastify";
import "./style/ViewOrder.css";

const ViewOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const { fetchOrderData } = useContext(AppContext);

  // 🔄 Fetch Pending Orders
  const fetchPendingOrders = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_PENDING_ORDERS);
      console.log("Pending Orders Response:", response);
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching pending orders:", error);
      toast.error("Failed to load pending orders.");
    }
  };

  // 🚀 Initial fetch
  useEffect(() => {
    fetchPendingOrders();
  }, []);

  // 🔍 Filter Orders
  const filteredOrders = (orders || []).filter((order) =>
    order.id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Confirm Order
  const confirmOrder = async (id) => {
    try {
      const response = await axiosConfig.put(API_ENDPOINTS.CONFIRM_ORDER(id));
      if (response.status === 200) {
        toast.success("Order confirmed successfully!");
        await fetchPendingOrders(); // Refresh table
        if (fetchOrderData) await fetchOrderData(); // Refresh global context if used
      }
    } catch (error) {
      console.error("Confirm Order Error:", error);
      toast.error("Failed to confirm order.");
    }
  };

  // ❌ Cancel Order
  const cancelOrder = async (id) => {
    try {
      const response = await axiosConfig.put(API_ENDPOINTS.CANCEL_ORDER(id));
      if (response.status === 200) {
        toast.info("Order cancelled.");
        await fetchPendingOrders();
        if (fetchOrderData) await fetchOrderData();
      }
    } catch (error) {
      console.error("Cancel Order Error:", error);
      toast.error("Failed to cancel order.");
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="text-center mb-5">
        <h2 className="text-cookie-title fw-bold mb-2">🍪 Pending Orders</h2>
        <p className="text-muted">
          Manage all pending customer orders below. Confirm or cancel once verified.
        </p>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <div className="input-group w-50 shadow-sm">
          <span className="input-group-text bg-cookie text-white border-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Search by Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-cookie text-white fw-semibold d-flex justify-content-between align-items-center">
          <span>Pending Orders List</span>
          <span className="badge text-white text-cookie-title">
            {filteredOrders.length} Pending
          </span>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle text-start mb-0">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Order Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="table-row-hover">
                      <td className="fw-semibold">{order.id}</td>
                      {/* Array, and inside the array is a list, which has id, name and price */}
                      <td>
                        {Array.isArray(order.items)
                            ? order.items.map((item) => `${item.name} (x${item.qty})`).join(", ")
                            : "No items"}

                      </td>
                        <td>
                        ₱{(order.amount ?? 0).toFixed(2)}
                        </td>

                      <td>{order.date ? new Date(order.date).toLocaleString() : "N/A"}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-success btn-sm px-3 me-2 shadow-sm"
                          onClick={() => confirmOrder(order.id)}
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-danger btn-sm px-3 shadow-sm"
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No pending orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
