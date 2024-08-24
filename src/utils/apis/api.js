import { AUTH_PATH, CATEGORY_PATH, PRODUCT_PATH, USER_PATH } from "./path";
import { API_BASE_URL } from "../constants";

const mainUrl = API_BASE_URL;

const headers = {
    'Content-Type': 'application/json',
};

// Auth Functions
export const signUp = async (payload) => {
    const response = await fetch(`${mainUrl}${AUTH_PATH.SIGN_UP}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const signIn = async (payload) => {
    const response = await fetch(`${mainUrl}${AUTH_PATH.SIGN_IN}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

// Category Functions
export const listCategories = async () => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.LIST}`);
    return response.json();
};

export const getCategoryById = async (id) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.LIST_BY_ID.replace(':id', id)}`);
    return response.json();
};

export const createCategory = async (payload) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.CREATE}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const updateCategory = async (id, payload) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.UPDATE.replace(':id', id)}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const deleteCategory = async (id) => {
    const response = await fetch(`${mainUrl}${CATEGORY_PATH.DELETE.replace(':id', id)}`, {
        method: 'DELETE',
        headers,
    });
    return response.json();
};

// Product Functions
export const listProducts = async () => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.LIST}`);
    return response.json();
};

export const getProductById = async (id) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.LIST_BY_ID.replace(':id', id)}`);
    return response.json();
};

export const createProduct = async (payload) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.CREATE}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const updateProduct = async (id, payload) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.UPDATE.replace(':id', id)}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${mainUrl}${PRODUCT_PATH.DELETE.replace(':id', id)}`, {
        method: 'DELETE',
        headers,
    });
    return response.json();
};

// User Functions
export const listUsers = async () => {
    const response = await fetch(`${mainUrl}${USER_PATH.LIST}`);
    return response.json();
};

export const updateUser = async (payload) => {
    const response = await fetch(`${mainUrl}${USER_PATH.UPDATE_USER}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const updatePassword = async (payload) => {
    const response = await fetch(`${mainUrl}${USER_PATH.UPDATE_PASSWORD}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const uploadUserImage = async (formData) => {
    const response = await fetch(`${mainUrl}${USER_PATH.UPLOAD_IMAGE}`, {
        method: 'POST',
        headers: {
            // Avoid setting 'Content-Type' header for FormData
        },
        body: formData,
    });
    return response.json();
};

