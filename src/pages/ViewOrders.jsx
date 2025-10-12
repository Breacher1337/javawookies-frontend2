import { useContext, useState } from "react";
import AppContext from "../context/AppContext.jsx";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { toast } from "react-toastify";
import "./style/ViewOrder.css";

const ViewOrders = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { orderData, fetchOrderData } = useContext(AppContext);

    const filteredOrders = (orderData || []).filter((order) =>
        order.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const confirmOrders = async (orderId) => {
        try {
            const response = await axiosConfig.put(
                API_ENDPOINTS.CONFIRM_ORDER(orderId)
            );

            if (response.status === 200) {
                toast.success("Order confirmed successfully!");
                if (fetchOrderData) await fetchOrderData();
            } else {
                toast.error("Failed to confirm order. Please try again.");
            }
        } catch (error) {
            console.error("Confirm Order Error:", error);
            toast.error("Something went wrong confirming the order.");
        }
    };

    return (
        <div className="container mt-5 pt-4">
            <div className="text-center mb-5">
                <h2 className="text-cookie-title fw-bold mb-2">🍪 Pending Orders</h2>
                <p className="text-muted">
                    Manage all pending customer orders below. You can confirm orders once
                    verified.
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
                                <th className="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.orderId} className="table-row-hover">
                                        <td className="fw-semibold">{order.orderId}</td>
                                        <td>{order.items?.join(", ") || "No items"}</td>
                                        <td>₱{order.amount.toFixed(2)}</td>
                                        <td>{order.date}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-success btn-sm px-3 shadow-sm"
                                                onClick={() => confirmOrders(order.orderId)}
                                            >
                                                <i className="me-1"></i>
                                                Confirm
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
