import { AUTH_PATH, CATEGORY_PATH, PRODUCT_PATH, USER_PATH } from "./path";
import { API_BASE_URL } from "../constants";

const mainUrl = API_BASE_URL;

const headers = {
    'Content-Type': 'application/json',
};

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
export const listCategories = async (token) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.LIST}`, {
        headers: {
            ...createHeaders(token),
            "ngrok-skip-browser-warning": "69420", 
            "Content-Type": "application/json",
        },
    });
    return response.json();
};

export const getCategoryById = async (id, token) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.LIST_BY_ID.replace(':id', id)}`, {
        headers: createHeaders(token),
    });
    return response.json();
};

export const createCategory = async (payload, token) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.CREATE}`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const updateCategory = async (id, payload, token) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.UPDATE.replace(':id', id)}`, {
        method: 'PUT',
        headers: createHeaders(token),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const deleteCategory = async (id, token) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.DELETE.replace(':id', id)}`, {
        method: 'DELETE',
        headers: createHeaders(token),
    });
    return response.json();
};

// Product Functions
export const listProducts = async (token) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.LIST}`, {
        headers: createHeaders(token),
    });
    return response.json();
};

export const getProductById = async (id, token) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.LIST_BY_ID.replace(':id', id)}`, {
        headers: createHeaders(token),
    });
    return response.json();
};

export const listProductsByCategory = async (categoryId, token) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.LIST_BY_CATEGORY_ID}${categoryId}`, {
        method: 'GET',
        headers: createHeaders(token),
    });
    return response.json();
};

export const createProduct = async (payload, token) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.CREATE}`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const updateProduct = async (id, payload, token) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.UPDATE.replace(':id', id)}`, {
        method: 'PUT',
        headers: createHeaders(token),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const deleteProduct = async (id, token) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.DELETE.replace(':id', id)}`, {
        method: 'DELETE',
        headers: createHeaders(token),
    });
    return response.json();
};

// User Functions
export const listUsers = async (token) => {
    const response = await fetch(`${mainUrl}${USER_PATH.LIST}`, {
        headers: createHeaders(token),
    });
    return response.json();
};

export const updateUser = async (payload, token) => {
    const response = await fetch(`${mainUrl}${USER_PATH.UPDATE_USER}`, {
        method: 'PUT',
        headers: createHeaders(token),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const updatePassword = async (payload, token) => {
    const response = await fetch(`${mainUrl}${USER_PATH.UPDATE_PASSWORD}`, {
        method: 'PUT',
        headers: createHeaders(token),
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const uploadUserImage = async (formData, token) => {
    const response = await fetch(`${mainUrl}${USER_PATH.UPLOAD_IMAGE}`, {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
    return response.json();
};
