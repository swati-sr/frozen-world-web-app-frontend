"use client";
import AdminTabs from "@/components/AdminTabs";
import Cookies from "js-cookie";
import Header from "@/components/Header";
import { API_BASE_URL } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import ImageBox from "@/components/ImageBox";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";

const Page = () => {
  const tokenFromCookie = Cookies.get("access_token");
  if (!tokenFromCookie) redirect("/");

  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [optionalBtn, setOptionalBtn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: category,
        parentCategory: 0,
      };
      const response = await axios.post(
        `${API_BASE_URL}/category/create`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setCategoryList((prevList) => [...prevList, response.data.data]);
        setCategory("");
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/`, {
        headers: {
          Authorization: `Bearer ${tokenFromCookie}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
      });

      if (response.headers["content-type"].includes("text/html")) {
        throw new Error("Received HTML response instead of JSON");
      }

      if (response.data && response.data.data) {
        setCategoryList(response.data.data);
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryUpdate = async (e) => {
    e.preventDefault();
    const { id, imageURL, parentCategory } = editCategory;
    try {
      const payload = {
        name: category,
        parentCategory: parentCategory,
        imageURL: imageURL,
      };
      const response = await axios.patch(
        `${API_BASE_URL}/category/update/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        }
      );
      if (response.data) {
        setCategoryList((prevList) =>
          prevList.map((cat) => (cat.id === id ? response.data.data : cat))
        );
        await fetchCategories();
        setEditCategory(null);
        setCategory("");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    const { id } = deleteCategory;
    try {
      const response = await axios.delete(`${API_BASE_URL}/category/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenFromCookie}`,
        },
      });
      if (response.data) {
        setCategoryList((prevList) => prevList.filter((cat) => cat.id !== id));
        await fetchCategories();
        setDeleteCategory(null);
        setCategory("");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [imageLink]);

  return (
    <>
      <div className="flex">
        <Sidebar isAdmin={true} />
        <div className="flex-grow p-8 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Manage Categories</h2>
            <div className="space-y-6">
              <form
                onSubmit={(e) => {
                  if (editCategory) {
                    handleCategoryUpdate(e);
                  } else if (deleteCategory) {
                    handleDeleteCategory(e);
                  } else {
                    handleNewCategorySubmit(e);
                  }
                }}
                className="space-y-4"
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder={`Category to be ${editCategory ? "updated" : deleteCategory ? "deleted" : "added"}`}
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="flex-grow px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-md shadow-sm font-medium text-white transition-all transform-gpu duration-300 ${
                      editCategory
                        ? "bg-blue-500 hover:bg-blue-600"
                        : deleteCategory
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {editCategory ? "Update" : deleteCategory ? "Delete" : "Add"}
                  </button>
                </div>
              </form>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categoryList.length > 0 &&
                  categoryList.map((p) => (
                    <div
                      className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between transition-transform duration-300 transform-gpu hover:scale-105 hover:shadow-lg"
                      key={p.id}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-lg">{p.name}</span>
                        <img
                          src={p.imageURL || "https://via.placeholder.com/50"}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                      <div className="mt-4 flex justify-between items-center space-x-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => {
                            setDeleteCategory(null);
                            setEditCategory(p);
                            setCategory(p.name);
                            setImageId(null);
                            setOptionalBtn(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => {
                            setIsModalOpen(true);
                            setImageId(p.id);
                            setImageName(p.name);
                            setEditCategory(null);
                            setDeleteCategory(null);
                            setImageLink(p.imageURL);
                            setOptionalBtn(true);
                          }}
                        >
                          Upload
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => {
                            setEditCategory(null);
                            setDeleteCategory(p);
                            setCategory(p.name);
                            setImageId(null);
                            setOptionalBtn(true);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="text-yellow-500 hover:underline"
                          onClick={() => {
                            setEditCategory(null);
                            setDeleteCategory(null);
                            setCategory(null);
                            setImageId(null);
                            router.push(`/product/items?id=${p.id}`);
                            setOptionalBtn(true);
                          }}
                        >
                          Products
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md relative transition-transform transform-gpu duration-300">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Upload Image for {imageName}</h3>
            <ImageBox
              link={imageLink}
              apiUrl={`category/upload/${imageId}`}
              title={`Upload for ${imageName}`}
              setLink={(link) => setImageLink(link)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
