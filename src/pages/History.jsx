// import {useEffect, useState} from "react";
// import axiosConfig from "../util/axiosConfig.js";
// import {API_ENDPOINTS} from "../util/apiEndpoints.js";
// import {toast} from "react-toastify";

const History = () => {
    // For storing data
    // const [orders, setOrders] = useState([]);

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // For getting all ordersData from api
    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         try {
    //             // change this to your actual backend endpoint
    //             const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_ORDERS);
    //             if (response.status === 200) {
    //                 setOrders(response.data);
    //             }
    //         } catch (err) {
    //             toast.error(err.message);
    //             setError("Failed to load order history");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchOrders();
    // }, []);

    // just sample orders data
    const orders = [
        { id: 'ORD001', items: 'Latte, Croissant', price: 300, status: 'Completed', date: '2025-10-10' },
        { id: 'ORD002', items: 'Espresso', price: 250, status: 'Pending',  date: '2025-10-11' },
        { id: 'ORD003', items: 'Cappuccino, Muffin', price: 350, status: 'Pending', date: '2025-10-12' },
    ];

    // if (loading) return <p className="text-center mt-5">Loading orders...</p>;
    // if (error) return <p className="text-center text-danger mt-5">{error}</p>;

    return (
        <div className="container mt-5 pt-4">
            <h2 className="text-center mb-4 text-cookie-title fw-bold">Order History</h2>
            <div className="table-responsive">
                <table className="table table-hover align-middle text-start shadow-sm">
                    <thead className="table-cookie text-white">
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="fw-semibold">{order.id}</td>
                            <td>{order.items}</td>
                            <td>&#8369;{order.price}</td>
                            <td>
                                <span className={`badge px-3 py-2 ${order.status === 'Completed' ? 'bg-success' : 'bg-warning text-white'}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>{order.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
