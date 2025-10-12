export const BASE_URL = 'http://localhost:8080/api/v1';

// just ex. API endpoints
export const API_ENDPOINTS = {
    ADD_ORDER: "/create",
    GET_ORDERS: "/orders",
    GET_CATEGORIES: "/categories",
    GET_ITEMS: "/items",
    GET_ALL_ORDERS: "/orders/all",
    GET_ALL_PENDING_ORDERS: "/pending",
    CONFIRM_ORDER: (orderId)  => `/confirm/${orderId}`,
}