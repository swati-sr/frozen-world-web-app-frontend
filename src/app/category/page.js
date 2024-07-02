"use client";
import AdminTabs from "@/components/AdminTabs";
import Cookies from "js-cookie";
import Header from "@/components/Header";
import { API_BASE_URL } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import ImageBox from "@/components/ImageBox";

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
      <Header />
      <div className="mt-8 max-w-md mx-auto mb-4">
        <AdminTabs isAdmin={true} />
        <div className="bg-formOne p-4 rounded-md">
          <form
            className="mt-8"
            onSubmit={
              editCategory
                ? handleCategoryUpdate
                : deleteCategory
                ? handleDeleteCategory
                : handleNewCategorySubmit
            }
          >
            <div className="flex gap-2 items-end">
              {imageId && (
                <div className="ml-[112px]">
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
          <div className="mt-5">
            {categoryList.length > 0 &&
              categoryList.map((p) => (
                <div
                  className="border flex border-baseOne justify-end my-1 rounded-md bg-gray-200"
                  key={p.id}
                >
                  <span className="py-1 px-2 font-medium w-3/4">{p.name}</span>
                  <button
                    className="mx-4 font-medium hover:text-green-600 text-bright"
                    onClick={() => {
                      setDeleteCategory(null);
                      setEditCategory(p);
                      setCategory(p.name);
                      setImageId(null);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="mx-4 font-medium hover:text-blue-700 text-bright"
                    onClick={() => {
                      setImageId(p.id);
                      setImageName(p.name);
                      setEditCategory(null);
                      setDeleteCategory(null);
                      setImageLink(p.imageURL);
                    }}
                  >
                    Upload
                  </button>
                  <button
                    className="mx-4 font-medium hover:text-red-900 text-bright"
                    onClick={() => {
                      setEditCategory(null);
                      setDeleteCategory(p);
                      setCategory(p.name);
                      setImageId(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
