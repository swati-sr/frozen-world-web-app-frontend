"use client";
import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import dummy from "../../public/dummyProduct.jpg"; 
import { listCategories } from "@/utils/apis/api";   
import Cookies from "js-cookie";

const ProductContainer = () => {
  const [catList, setCatList] = useState([]);
  const [loading, setLoading] = useState(true);  
  const containerRef = useRef(null);

  const fetchCat = async () => {
    try {
      const tokenFromCookie = Cookies.get("access_token");
      const response = await listCategories(tokenFromCookie);

      if (response.data && response.data?.data) {
        setCatList(response.data?.data); 
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <div className="text-center">Loading categories...</div>
  }

  return (
    <div className="relative w-full bg-white p-6 py-24 px-32">
      <div className="flex items-center justify-center text-4xl font-medium pb-5">
        <h2 className="text-darkText">Shop by Cuisine or Category</h2>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={scrollLeft}
          className="border border-primary text-secondary py-3 px-2 rounded-sm"
        >
          &#10094;
        </button>
        <div
          className="flex overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          ref={containerRef}
        >
          {catList.map((item) => (
            <div
              key={item.id}
              className="flex flex-shrink-0 w-[100%] sm:w-[50%] justify-center items-center"
            >
              <Card
                className="bg-green"
                productImage={item.imageURL ? item.imageURL : dummy}
                heading={item.name}
                id={item.id}
              />
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="bg-bright text-white py-3 px-2 rounded-sm"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ProductContainer;
