"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import food1 from "../../public/food1.jpg";
import { API_BASE_URL, FOOD_PRODUCT_LIST } from "@/utils/constants";

const ProductContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(FOOD_PRODUCT_LIST.length / 2) - 1
        : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(FOOD_PRODUCT_LIST.length / 2) - 1
        ? 0
        : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden bg-white p-6 h-[25%] py-24">
      <div
        className="flex transition-transform ease-in-out duration-500 px-12"
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {FOOD_PRODUCT_LIST.map((item) => (
          <div key={item.id} className="w-[53%] flex-shrink-0">
            <Card productImage={food1} heading={item.name} id={item.id} />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 border border-primary text-secondary ml-6 py-3 px-2 file:ml-6 rounded-sm"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-bright text-white py-3 px-2 mr-28 rounded-sm"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default ProductContainer;
