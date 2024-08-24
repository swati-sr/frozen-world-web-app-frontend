"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Items from "@/components/Items";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { listProductsByCategory, listProducts } from "@/utils/apis/api"; 
import SearchBar from "@/components/SeacrhBar";

const Page = () => {
  const searchParams = useSearchParams();
  const urlId = searchParams.get("id");
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = !urlId 
        ? await listProducts() 
        : await listProductsByCategory(urlId);

      const products = response.data?.data || [];
      setProductList(products);
      setFilteredProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (query) {
      const filtered = productList.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productList);
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
            <div className="flex items-center">
              <SearchBar placeholderText={"Find the products here"} onSearch={handleSearch} />
            </div>
          )}
        </div>
        {loading ? (
          <div className="text-center text-gray-600 text-xl">
            Loading items...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 w-full max-w-6xl">
            {filteredProducts.map((item) => (
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
