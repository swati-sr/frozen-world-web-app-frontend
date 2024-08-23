"use client"; 
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import React, { useRef, useState } from "react";
import ImageBox from "@/components/ImageBox";
import { Sidebar } from "@/components/Sidebar";
import { useSearchParams } from "next/navigation";
import useProducts from "@/utils/useProducts"; 

const Page = () => {
  const token = Cookies.get("access_token");
  if (!token) redirect("/");
  const searchParams = useSearchParams();
  const urlId = searchParams.get("id");

  const {
    productList,
    loading,
    createNewProduct,
    updateExistingProduct,
    removeProduct,
  } = useProducts(urlId);

  const [imageLink, setImageLink] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const itemName = useRef(null);
  const itemDescription = useRef(null);
  const itemSize = useRef(null);
  const itemPrice = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: itemName.current.value,
      description: itemDescription.current.value,
      size: itemSize.current.value,
      price: itemPrice.current.value,
      category: urlId,
    };
    createNewProduct(payload);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const { id } = editProduct;
    const payload = {
      name: itemName.current.value,
      description: itemDescription.current.value,
      size: itemSize.current.value,
      price: itemPrice.current.value,
      category: urlId,
    };
    updateExistingProduct(id, payload);
    setEditProduct(null);
  };

  return (
    <div className="flex">
      <Sidebar isAdmin={true} className="sticky top-0 h-screen" />
      <div className="flex-grow flex flex-col">
        <h2 className="text-primary text-2xl font-bold text-center py-6 w-full shadow-xl sticky top-0 bg-white z-10">
          Items in Category
        </h2>
        <div className="flex flex-col lg:flex-row flex-grow p-6">
          <form
            className="flex flex-col bg-formOne p-5 rounded-md shadow-md w-full lg:w-1/3 mb-6 lg:mb-0"
            onSubmit={editProduct ? handleUpdateProduct : handleFormSubmit}
          >
            {imageId && (
              <ImageBox
                link={imageItem}
                apiUrl={`product/upload/${imageId}`}
                title={"Upload"}
                setLink={setImageItem}
              />
            )}
            <label className="text-sm font-medium text-secondary mt-4">Product Item</label>
            <input
              type="text"
              className="w-full mb-2 py-2 px-4 font-medium rounded-md shadow-md"
              ref={itemName}
              defaultValue={editProduct?.name || ""}
            />
            <label className="text-sm font-medium text-secondary mt-2">Description</label>
            <input
              type="text"
              className="w-full mb-2 py-2 px-4 font-medium rounded-md shadow-md"
              ref={itemDescription}
              defaultValue={editProduct?.description || ""}
            />
            <label className="text-sm font-medium text-secondary mt-2">Size</label>
            <input
              type="text"
              className="w-full mb-2 py-2 px-4 font-medium rounded-md shadow-md"
              ref={itemSize}
              defaultValue={editProduct?.size || ""}
            />
            <label className="text-sm font-medium text-secondary mt-2">Price</label>
            <input
              type="text"
              className="w-full mb-2 py-2 px-4 font-medium rounded-md shadow-md"
              ref={itemPrice}
              defaultValue={editProduct?.price || ""}
            />
            <label className="text-sm font-medium text-secondary mt-2">Category</label>
            <input
              type="text"
              className="w-full mb-2 py-2 px-4 font-medium rounded-md shadow-md"
              value={urlId}
              disabled
            />
            <button
              type="submit"
              className="bg-bright text-white py-2 px-4 rounded-md mt-4 shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright transition-transform duration-300 transform-gpu"
            >
              {editProduct ? "Update" : "Create"}
            </button>
          </form>
          <div className="flex-grow lg:ml-6 bg-white p-6 rounded-md shadow-md overflow-y-auto">
            {loading ? (
              <p>Loading...</p>
            ) : productList.length === 0 ? (
              <div className="text-center text-gray-600">
                <p className="text-lg font-medium">No items in this category yet.</p>
              </div>
            ) : (
              productList.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center p-4 my-4 border-b border-gray-200 transition-transform duration-300 transform-gpu hover:scale-105 hover:shadow-lg"
                >
                  <img
                    src={product.imageURL || "/placeholder.jpg"}
                    alt="Item"
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-gray-600">Size: {product.size}</p>
                    <p className="text-gray-600">Price: {product.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-orange-400 text-white py-1 px-2 rounded-md shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright transition-transform duration-300 transform-gpu"
                      onClick={() => setImageId(product.id)}
                    >
                      Upload
                    </button>
                    <button
                      className="bg-bright text-white py-1 px-2 rounded-md shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright transition-transform duration-300 transform-gpu"
                      onClick={() => {
                        setEditProduct(product);
                        itemName.current.value = product.name;
                        itemDescription.current.value = product.description;
                        itemSize.current.value = product.size;
                        itemPrice.current.value = product.price;
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform duration-300 transform-gpu"
                      onClick={() => removeProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
