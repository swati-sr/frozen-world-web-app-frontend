"use client";
import { logout } from "@/lib/features/authSlice";
import { WEB_APP_NAME } from "@/utils/constants";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Discount from "./Discount";
import { useRouter } from "next/navigation";
import {
  GrFireball,
  AiFillProduct,
  FaBoxOpen,
  IoPeopleCircle,
  IoMdCart,
  RiUserSmileFill,
  MdOutlineFollowTheSigns,
  FaUser,
  MdDarkMode,
} from "../utils/icon";
import { toggleDarkMode } from "@/lib/features/darkModeSlice";

const Header = () => {
  const { token, firstName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter(); 

  const handleFoodProduct = () => {
    router.push("/product");
  };

  const handleTheme = () => {
    dispatch(toggleDarkMode());
  }

  const handleSignout = () => {
    dispatch(logout());
    router.push("/");
  }; 

  return (
    <>
      <div className="py-4 px-4 md:px-16 flex justify-between items-center shadow-md sticky top-0 bg-yellow z-10">
        <Link href="/" className="text-white font-bold text-2xl">
          {WEB_APP_NAME}
        </Link>
        <div className="hidden md:flex text-darkText font-semibold text-base">
          <div className="relative">
            <span
              className="px-4 hover:cursor-pointer hover:text-white flex items-center"
              onClick={handleFoodProduct}
            >
              <AiFillProduct className="mr-2" />
              Products
            </span>
          </div>
          <Link
            href="/wholesale"
            className="px-4 hover:cursor-pointer hover:text-white flex items-center"
          >
            <FaBoxOpen className="mr-2" />
            Wholesale
          </Link>
          <Link
            className="px-4 hover:cursor-pointer hover:text-white flex items-center"
            href="/help"
          >
            <GrFireball className="mr-2" />
            Help
          </Link>
          <Link
            href="/about"
            className="px-4 hover:cursor-pointer hover:text-white flex items-center"
          >
            <IoPeopleCircle className="mr-2" />
            About
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          {/* <MdDarkMode
            className="mr-4 text-lg hover:cursor-pointer hover:text-darkText text-white"
            onClick={handleTheme}
          /> */}
          {token && firstName ? (
            <>
              <Link
                href="/profile"
                className="px-4 text-white hover:text-darkText hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-darkText hover:mr-2 flex items-center"
              >
                <RiUserSmileFill className="mr-2" /> {firstName}
              </Link>
              <Link
                href="/profile"
                className="px-4 text-white hover:text-darkText hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-darkText hover:mr-2 flex items-center"
              >
                <IoMdCart className="mr-2" /> Cart
              </Link>
              <button
                onClick={handleSignout}
                className="px-4 text-white bg-darkText border-2 rounded-md border-darkText p-2 hover:cursor-pointer hover:shadow-lg flex items-center hover:bg-bright hover:border-bright"
              >
                <FaUser className="mr-2" /> Sign Out
              </button> 
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-4 text-white hover:text-darkText hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-darkText hover:mr-2 flex items-center"
              >
                <FaUser className="mr-2" /> Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 text-white hover:text-darkText hover:bg-white hover:border-darkText bg-darkText border-2 rounded-md border-darkText p-2 hover:cursor-pointer hover:shadow-lg flex items-center"
              >
                <MdOutlineFollowTheSigns className="mr-2" /> Sign Up
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <MdDarkMode
            className="mr-4 text-lg text-white hover:cursor-pointer hover:text-darkText"
            onClick={handleTheme}
          />
          <button 
            className="text-white hover:text-darkText"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;