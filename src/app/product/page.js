"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Items from "@/components/Items";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { API_BASE_URL } from "@/utils/constants";

const Page = () => {
  const searchParams = useSearchParams();
  const urlId = searchParams.get("id");
  const [productList, setProductList] = useState([]);

  const fetchProducts = async () => {
    if (!urlId) return;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/category?categoryId=${urlId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.headers["content-type"].includes("text/html")) {
        throw new Error("Received HTML response instead of JSON");
      }

      if (response.data && response.data.data) {
        setProductList(response.data.data);
      } else {
        console.error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [urlId]);

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Regular Odds
          </h1>
          <p className="text-lg text-gray-600">
            Grab your item at affordable prices. Don't wait, give a call.
          </p>
        </div>
        {productList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 w-full max-w-6xl">
            {productList.map((item) => (
              <Items
                key={item.id}
                image={item.imageURL}
                name={item.name}
                description={item.description}
                size={item.size}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-xl">
            No items available at the moment.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Page;
