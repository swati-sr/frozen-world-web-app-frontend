import { AUTH_PATH, CATEGORY_PATH, PRODUCT_PATH, USER_PATH } from "./path";
import { API_BASE_URL } from "../constants";
import Cookies from "js-cookie";

const mainUrl = API_BASE_URL;

const headers = {
    'Content-Type': 'application/json',
};

const tokenFromCookie = Cookies.get("access_token");

// Helper function
const createHeaders = (token) => {
    const customHeaders = { ...headers };
    if (token) {
        customHeaders.Authorization = `Bearer ${token}`;
    }
    return customHeaders;
};

// Auth Functions
export const signUp = async (payload) => {
    const response = await fetch(`${mainUrl}${AUTH_PATH.SIGN_UP}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const signIn = async (payload) => {
    const response = await fetch(`${mainUrl}${AUTH_PATH.SIGN_IN}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

// Category Functions
export const listCategories = async () => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.LIST}`, {
        headers: {
            ...createHeaders(tokenFromCookie),
            "ngrok-skip-browser-warning": "69420", 
        },
    });
    return response.json();
};

export const getCategoryById = async (id) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.LIST_BY_ID.replace(':id', id)}`, {
        headers: createHeaders(tokenFromCookie),
    });
    return response.json();
};

export const createCategory = async (payload) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.CREATE}`, {
        method: 'POST',
        headers: createHeaders(tokenFromCookie),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const updateCategory = async (id, payload) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.UPDATE.replace(':id', id)}`, {
        method: 'PUT',
        headers: createHeaders(tokenFromCookie),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const deleteCategory = async (id) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.DELETE.replace(':id', id)}`, {
        method: 'DELETE',
        headers: createHeaders(tokenFromCookie),
    });
    return response.json();
};

// Product Functions
export const listProducts = async () => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.LIST}`, {
        headers: createHeaders(tokenFromCookie),
    });
    return response.json();
};

export const getProductById = async (id) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.LIST_BY_ID.replace(':id', id)}`, {
        headers: createHeaders(tokenFromCookie),
    });
    return response.json();
};

export const listProductsByCategory = async (categoryId) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.LIST_BY_CATEGORY_ID}${categoryId}`, {
        method: 'GET',
        headers: createHeaders(tokenFromCookie),
    });
    return response.json();
};

export const createProduct = async (payload) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.CREATE}`, {
        method: 'POST',
        headers: createHeaders(tokenFromCookie),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const updateProduct = async (id, payload) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.UPDATE.replace(':id', id)}`, {
        method: 'PUT',
        headers: createHeaders(tokenFromCookie),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.DELETE.replace(':id', id)}`, {
        method: 'DELETE',
        headers: createHeaders(tokenFromCookie),
    });
    return response.json();
};

// User Functions
export const listUsers = async () => {
    const response = await fetch(`${mainUrl}${USER_PATH.LIST}`, {
        headers: createHeaders(tokenFromCookie),
    });
    return response.json();
};

export const updateUser = async (payload) => {
    const response = await fetch(`${mainUrl}${USER_PATH.UPDATE_USER}`, {
        method: 'PATCH',
        headers: createHeaders(tokenFromCookie),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const updatePassword = async (payload) => {
    const response = await fetch(`${mainUrl}${USER_PATH.UPDATE_PASSWORD}`, {
        method: 'PUT',
        headers: createHeaders(tokenFromCookie),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const uploadUserImage = async (formData) => {
    const response = await fetch(`${mainUrl}${USER_PATH.UPLOAD_IMAGE}`, {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${tokenFromCookie}`,
        },
        body: formData,
    });
    return response.json();
};
