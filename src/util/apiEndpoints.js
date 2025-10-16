export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

export const API_ENDPOINTS = {
  // 🧾 Orders
  GET_ALL_PENDING_ORDERS: "/orders/pending",
  GET_HISTORY_ORDERS: "/orders/history",
  CREATE_ORDER: "/orders",
  CONFIRM_ORDER: (id) => `/orders/${id}/confirm`,
  CANCEL_ORDER: (id) => `/orders/${id}/cancel`,

  // (Optional future)
  // GET_ITEMS: "/items",
  // GET_CATEGORIES: "/categories",
};
