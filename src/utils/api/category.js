import axios from "axios";
import { API_BASE_URL } from "../constants";
import Cookies from "js-cookie";

const tokenFromCookie = Cookies.get("access_token");

const headers = {
  Authorization: `Bearer ${tokenFromCookie}`,
  "Content-Type": "application/json",
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/category/`, { headers });
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(
    `${API_BASE_URL}/category/create`,
    category,
    { headers }
  );
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await axios.patch(
    `${API_BASE_URL}/category/update/${id}`,
    category,
    { headers }
  );
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/category/${id}`, {
    headers,
  });
  return response.data;
};

export const uploadCategoryImage = async (id, formData) => {
  const response = await axios.post(
    `${API_BASE_URL}/category/upload/${id}`,
    formData,
    {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
