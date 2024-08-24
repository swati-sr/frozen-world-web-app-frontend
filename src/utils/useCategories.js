import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/utils/apis/api"; 

const useCategories = () => {
  const tokenFromCookie = Cookies.get("access_token");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteCategoryData, setDeleteCategoryData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!tokenFromCookie) {
      return; 
    }
    fetchCategories();
  }, [tokenFromCookie]);

  const fetchCategories = async () => {
    try {
      const response = await listCategories();  
      if (response.data) {
        setCategoryList(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: category,
        parentCategory: 0,
      };
      const response = await createCategory(payload);  
      if (response.data) {
        setCategoryList((prevList) => [...prevList, response.data]);
        setCategory("");
      }
    } catch (error) {
      console.error("Error creating category:", error.message);
    }
  };

  const handleCategoryUpdate = async (e) => {
    e.preventDefault();
    const { id } = editCategory;  
    try {
      const payload = {
        name: category,
        parentCategory: editCategory.parentCategory,
        imageURL: editCategory.imageURL,
      };
      const response = await updateCategory(id, payload);  
      if (response.data) {
        setCategoryList((prevList) =>
          prevList.map((cat) => (cat.id === id ? response.data : cat))
        );
        setEditCategory(null);
        setCategory("");
      }
    } catch (error) {
      console.error("Error updating category:", error.message);
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    const { id } = deleteCategoryData;  
    try {
      await deleteCategory(id);  
      setCategoryList((prevList) => prevList.filter((cat) => cat.id !== id));
      setDeleteCategoryData(null);
      setCategory("");
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  return {
    category,
    setCategory,
    categoryList,
    editCategory,
    setEditCategory,
    deleteCategoryData,
    setDeleteCategoryData,
    isModalOpen,
    setIsModalOpen,
    fetchCategories,
    handleNewCategorySubmit,
    handleCategoryUpdate,
    handleDeleteCategory,
  };
};

export default useCategories;
