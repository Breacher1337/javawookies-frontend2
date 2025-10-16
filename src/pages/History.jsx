import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { toast } from "react-toastify";
import "./style/ViewOrder.css";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order history from backend
  useEffect(() => {
    const fetchHistoryOrders = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GET_HISTORY_ORDERS);
        if (response.status === 200) {
          setOrders(response.data || []);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch history error:", err);
        toast.error("Failed to load order history.");
        setError("Unable to fetch order history from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryOrders();
  }, []);

  if (loading)
    return <p className="text-center mt-5">Loading order history...</p>;

  if (error)
    return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-5 pt-4">
      <h2 className="text-center mb-4 text-cookie-title fw-bold">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <p>No completed or cancelled orders yet.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle text-start shadow-sm">
            <thead className="table-cookie text-white">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Items</th>
                <th scope="col">Total Price</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="fw-semibold">{order.orderId}</td>
                  <td>{order.items?.map((i) => i.name).join(", ") || "No items"}</td>
                  <td>₱{order.amount?.toFixed(2) || 0}</td>
                  <td>
                    <span
                      className={`badge px-3 py-2 ${
                        order.status === "CONFIRMED"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
