"use client";
import { WEB_APP_NAME, FOOD_ITEM_LIST } from "@/utils/constants";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [showFoodItem, setShowFoodItem] = useState(false);

  const handleFoodProduct = () => {
    setShowFoodItem(!showFoodItem);
  };

  return (
    <div className="m-3 py-6 px-1 flex justify-around ">
      <h2 className="text-primary font-bold text-3xl">{WEB_APP_NAME}</h2>
      <div className="flex text-secondary font-medium text-base pt-2">
        <Link className="pr-4 hover:cursor-pointer hover:text-primary" href="/">
          Home
        </Link>
        <div className="relative">
          <span
            className="pr-4 hover:cursor-pointer hover:text-primary"
            onClick={handleFoodProduct}
          >
            Food Products
          </span>
        </div>
        <span className="pr-4 hover:cursor-pointer hover:text-primary">
          Wholesale
        </span>
        <span className="pr-4 hover:cursor-pointer hover:text-primary">
          About
        </span>
      </div>
      <div className="pt-2 font-medium text-base">
        <span className="pr-3 text-primary hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-primary hover:mr-2">
          <Link href="/signin">Sign In</Link>
        </span>
        <span className="px-4 text-bright border-2 rounded-md border-bright p-2 hover:cursor-pointer hover:shadow-lg">
          <Link href="signup">Sign Up</Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
