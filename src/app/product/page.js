"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Items from "@/components/Items";
import { FOOD_ITEM_LIST } from "@/utils/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Page = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const urlId = `${searchParams.get("id")}`;
    const foodCategory = FOOD_ITEM_LIST.find(
      (category) => category.id === urlId
    );
    if (!foodCategory) return "No items found";
    setData(foodCategory.items);
  }, [searchParams]);

  return (
    <>
      <Header />
      <div>
        <div className="bg-slate-200 h-full flex items-center flex-col mt-4 pb-8">
          <h1 className="text-6xl font-semibold pb-6 pt-3">Our Regular Odds</h1>
          <span className="py-4 text-lg text-secondary font-medium">
            Grab your item at affordable prices 😋. Don't wait, give a call 🤙
          </span>
          <div className="grid grid-cols-4 gap-8 mt-8 mx-[7.5rem]">
            {data.map((item) => {
              return (
                <Items
                  name={item.name}
                  description={item.description}
                  size={item.size}
                  price={item.price}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
