"use client";
import { logout } from "@/lib/features/authSlice";
import { toggleDarkMode } from "@/lib/features/darkModeSlice";
import { WEB_APP_NAME } from "@/utils/constants";
import Link from "next/link";
import React, { useState, Suspense } from "react";
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

const Header = () => {
  const { token, firstName } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showFoodItem, setShowFoodItem] = useState(false);

  const handleFoodProduct = () => {
    setShowFoodItem(!showFoodItem);
  };

  const handleSignout = () => {
    dispatch(logout());
    router.push("/");
  };

  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <head>
        <title>{WEB_APP_NAME}</title>
        <meta
          name="description"
          content={`${WEB_APP_NAME} - Your go-to app for amazing deals and products`}
        />
        <meta
          name="keywords"
          content="e-commerce, products, deals, wholesale, about us, help"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className="bg-primary text-white py-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
        <Discount offerBy={"Flat 50%"} offerAmount={"5000"} />
      </div>
      <header
        className={`py-4 px-16 flex justify-between items-center shadow-md sticky top-0 z-10 ${
          darkMode ? "bg-gray-900" : "bg-white"
        } ${darkMode ? "text-white" : "text-black"}`}
      >
        <Link
          href="/"
          className={`text-primary font-bold text-2xl ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {WEB_APP_NAME}
        </Link>
        <nav
          className="flex text-secondary font-medium text-lg"
          aria-label="Primary"
        >
          <div className="relative">
            <span
              className="px-4 hover:cursor-pointer hover:text-bright flex items-center"
              onClick={handleFoodProduct}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <AiFillProduct className="mr-2" />
              </Suspense>
              Products
            </span>
          </div>
          <Link
            href="/wholesale"
            className="px-4 hover:cursor-pointer hover:text-bright flex items-center"
            aria-label="Wholesale"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <FaBoxOpen className="mr-2" />
            </Suspense>
            Wholesale
          </Link>
          <Link
            className="px-4 hover:cursor-pointer hover:text-bright flex items-center"
            href="/"
            aria-label="Help"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <GrFireball className="mr-2" />
            </Suspense>
            Help
          </Link>
          <Link
            href="/about"
            className="px-4 hover:cursor-pointer hover:text-bright flex items-center"
            aria-label="About"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <IoPeopleCircle className="mr-2" />
            </Suspense>
            About
          </Link>
        </nav>
        <div className="flex items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <MdDarkMode
              className="mr-4 text-lg hover:cursor-pointer hover:text-bright"
              onClick={toggleDarkModeHandler}
            />
          </Suspense>
          {token && firstName ? (
            <>
              <Link
                href="/profile"
                className="px-4 text-primary hover:text-bright hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-bright hover:mr-2 flex items-center"
                aria-label="Profile"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <RiUserSmileFill className="mr-2" />
                </Suspense>
                {firstName}
              </Link>
              <Link
                href="/profile"
                className="px-4 text-primary hover:text-bright hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-bright hover:mr-2 flex items-center"
                aria-label="Cart"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <IoMdCart className="mr-2" />
                </Suspense>
                Cart
              </Link>
              <button
                onClick={handleSignout}
                className="px-4 text-white bg-primary border-2 rounded-md border-primary p-2 hover:cursor-pointer hover:shadow-lg flex items-center"
                aria-label="Sign Out"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <FaUser className="mr-2" />
                </Suspense>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-4 text-primary hover:text-bright hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-bright hover:mr-2 flex items-center"
                aria-label="Sign In"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <FaUser className="mr-2" />
                </Suspense>
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 text-white hover:bg-bright bg-primary border-2 rounded-md border-primary hover:border-bright p-2 hover:cursor-pointer hover:shadow-lg flex items-center"
                aria-label="Sign Up"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <MdOutlineFollowTheSigns className="mr-2" />
                </Suspense>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default React.memo(Header);
