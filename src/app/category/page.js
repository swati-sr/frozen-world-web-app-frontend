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
        <div className="grow">
          <h2 className="text-primary text-2xl font-bold text-center py-6 w-full shadow-xl">
            Category
          </h2>
          <div className="flex flex-col bg-formOne p-5 rounded-md m-10">
            {optionalBtn && (
              <button
                className="pl-5 text-end font-bold"
                onClick={() => {
                  setEditCategory(null);
                  setDeleteCategory(null);
                  setOptionalBtn(!optionalBtn);
                  setImageId(null);
                  setImageLink(null);
                  setImageName(null);
                }}
              >
                Or Add Category
              </button>
            )}
            <form
              className="mt-8"
              onSubmit={(e) => {
                if (editCategory) {
                  handleCategoryUpdate(e);
                } else if (deleteCategory) {
                  handleDeleteCategory(e);
                } else {
                  handleNewCategorySubmit(e);
                }
              }}
            >
              <div className="flex gap-2 items-end">
                {imageId && (
                  <div>
                    <ImageBox
                      link={imageLink}
                      apiUrl={`category/upload/${imageId}`}
                      title={`upload for ${imageName}`}
                      setLink={(link) => setImageLink(link)}
                    />
                  </div>
                )}
                {!imageId && (
                  <>
                    <div className="grow">
                      <label className="text-sm font-medium text-secondary pl-1">
                        {editCategory
                          ? `Update category: "${editCategory.name}"`
                          : deleteCategory
                          ? `Delete category: "${deleteCategory.name}"`
                          : "New category name"}
                      </label>
                      <input
                        type="text"
                        placeholder={`Category to be ${
                          editCategory
                            ? "updated"
                            : deleteCategory
                            ? "deleted"
                            : "added"
                        }`}
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
                      />
                    </div>
                    <div className="w-1/4 mt-3 py-1 text-center px-1 font-medium rounded-md shadow-md border border-primary hover:bg-primary hover:text-white hover:cursor-pointer">
                      <button type="submit">
                        {editCategory
                          ? "Update"
                          : deleteCategory
                          ? "Delete"
                          : "Add"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryList.length > 0 &&
                categoryList.map((p) => (
                  <div
                    className="border rounded-md bg-white p-4 shadow-md flex flex-col justify-between"
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
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        className="text-blue-600 hover:underline"
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
                        className="text-green-600 hover:underline"
                        onClick={() => {
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
                        className="text-red-600 hover:underline"
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
                        className="text-yellow-600 hover:underline"
                        onClick={() => {
                          setEditCategory(null);
                          setDeleteCategory(null);
                          setCategory(null);
                          setImageId(null);
                          router.push(`/product/items?id=${p.id}`);
                          setOptionalBtn(true);
                        }}
                      >
                        Items
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
