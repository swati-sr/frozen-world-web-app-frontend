"use client";
import { logout } from "@/lib/features/authSlice";
import { WEB_APP_NAME } from "@/utils/constants";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Discount from "./Discount";

const Header = () => {
  const { token, firstName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showFoodItem, setShowFoodItem] = useState(false);

  const handleFoodProduct = () => {
    setShowFoodItem(!showFoodItem);
  };

  const handleSignout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="bg-primary text-white py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-baseOne duration-300">
        <Discount offerBy={"Flat 50%"} offerAmount={"5000"} />
      </div>
      <div className="m-3 py-6 px-1 flex justify-around ">
        <Link
          href="/"
          className="text-primary font-bold text-3xl hover:text-bright"
        >
          {WEB_APP_NAME}
        </Link>
        <div className="flex text-secondary font-medium text-base pt-2">
          <Link
            className="pr-4 hover:cursor-pointer hover:text-primary"
            href="/"
          >
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
          <Link
            href="/wholesale"
            className="pr-4 hover:cursor-pointer hover:text-primary"
          >
            Wholesale
          </Link>
          <Link
            href="/about"
            className="pr-4 hover:cursor-pointer hover:text-primary"
          >
            About
          </Link>
        </div>
        <div className="pt-2 font-medium text-base">
          {token && firstName ? (
            <>
              <Link
                href="/profile"
                className="pr-3 text-primary hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-primary hover:mr-2"
              >
                {firstName}'s Profile
              </Link>
              <button
                onClick={handleSignout}
                className="px-4 text-bright border-2 rounded-md border-bright p-2 hover:cursor-pointer hover:shadow-lg"
              >
                {" "}
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="pr-3 text-primary hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-primary hover:mr-2"
              >
                Sign In
              </Link>
              <Link
                href="signup"
                className="px-4 text-bright border-2 rounded-md border-bright p-2 hover:cursor-pointer hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
