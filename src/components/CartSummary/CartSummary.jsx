import { useContext, useState } from 'react';
import AppContext from "../../context/AppContext.jsx";
import { toast } from 'react-toastify';
import axiosConfig from "../../util/axiosConfig.js";
import {API_ENDPOINTS} from "../../util/apiEndpoints.js";
import './CartSummary.css';


const CartSummary = () => {

    const {cartItems, clearCart}  = useContext(AppContext)
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const clearAll = () => {
        clearCart();
    }

    const placeOrder = () => {
        clearAll();
    };

    const completeOrder = async () => {
        if (cartItems.length === 0) {
            toast.error("Cart is empty. Please add items to proceed.");
            return;
        }

        const orderData = {
            cartItems,
            totalAmount
        }

        setIsProcessing(true);

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_ORDER(orderData));
            const savedData = response.data;
            if (response.status === 201) {
                toast.success("Order process successfully");
                setOrderDetails(savedData);
                placeOrder();
            }
        } catch (error) {
            console.error(error);
            toast.error("Order processing failed");
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <div className="mt-2">
            <div className="cart-summary-details">
                <hr className="custom-hr" />
                <div className="d-flex justify-content-between mb-4 fw-bold">
                    <span className="fnt-clr">Total</span>
                    <span className="fnt-clr">&#8369;{totalAmount.toFixed(2)}</span>
                </div>
            </div>

            <div className="d-flex gap-3">
                <button className="btn btn-success flex-grow-1" onClick={() => completeOrder("cash")} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Create Order"}
                </button>
            </div>
        </div>
    )
}

export default CartSummary;
