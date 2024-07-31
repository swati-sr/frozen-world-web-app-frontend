"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Items from "@/components/Items";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { API_BASE_URL } from "@/utils/constants";
import { IoIosSearch } from "@/utils/icon";

const Page = () => {
  const searchParams = useSearchParams();
  const urlId = searchParams.get("id");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    let url = "";
    if (!urlId) {
      url = `${API_BASE_URL}/product`;
    } else {
      url = `${API_BASE_URL}/product/category?categoryId=${urlId}`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
      });
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [urlId]);

  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
        <div className="text-center mb-12">
          {urlId ? (
            <>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Our Regular Odds
              </h1>
              <p className="text-lg text-gray-600">
                Grab your item at affordable prices. Don't wait, give a call.
              </p>
            </>
          ) : (
            <>
              <input type="text" placeholder="find the product here" />
              <button>{IoIosSearch}</button>
            </>
          )}
        </div>
        {loading ? (
          <div className="text-center text-gray-600 text-xl">
            Loading items...
          </div>
        ) : productList.length > 0 ? (
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
      </main>
      <Footer />
    </>
  );
};

export default Page;
