import { useEffect, useState } from "react";
import { listProductsByCategory, createProduct, updateProduct, deleteProduct } from "@/utils/apis/api";

const useProducts = (categoryId) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await listProductsByCategory(categoryId);
      setProductList(response.data || []);
    } catch (err) {
      setError(err);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const createNewProduct = async (payload) => {
    setLoading(true);
    try {
      await createProduct(payload);
      await fetchProducts();
    } catch (err) {
      setError(err);
      console.error("Error creating product:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateExistingProduct = async (id, payload) => {
    setLoading(true);
    try {
      await updateProduct(id, payload);
      await fetchProducts();
    } catch (err) {
      setError(err);
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError(err);
      console.error("Error deleting product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  return {
    productList,
    loading,
    error,
    createNewProduct,
    updateExistingProduct,
    removeProduct,
  };
};

export default useProducts;
