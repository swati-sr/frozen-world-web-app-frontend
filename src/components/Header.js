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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFoodProduct = () => {
    router.push("/product");
  };

  const handleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const handleSignout = () => {
    dispatch(logout());
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-primary text-white py-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
        <Discount offerBy={"Flat 50%"} offerAmount={"5000"} />
      </div>
      <div className="py-4 px-4 md:px-16 flex justify-between items-center shadow-md sticky top-0 bg-white z-10">
        <Link href="/" className="text-primary font-bold text-2xl">
          {WEB_APP_NAME}
        </Link>
        <div className="hidden md:flex text-secondary font-medium text-lg">
          <div className="relative">
            <span
              className="px-4 hover:cursor-pointer hover:text-bright flex items-center"
              onClick={handleFoodProduct}
            >
              <AiFillProduct className="mr-2" />
              Products
            </span>
          </div>
          <Link
            href="/wholesale"
            className="px-4 hover:cursor-pointer hover:text-bright flex items-center"
          >
            <FaBoxOpen className="mr-2" />
            Wholesale
          </Link>
          <Link
            className="px-4 hover:cursor-pointer hover:text-bright flex items-center"
            href="/help"
          >
            <GrFireball className="mr-2" />
            Help
          </Link>
          <Link
            href="/about"
            className="px-4 hover:cursor-pointer hover:text-bright flex items-center"
          >
            <IoPeopleCircle className="mr-2" />
            About
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          <MdDarkMode
            className="mr-4 text-lg hover:cursor-pointer hover:text-bright"
            onClick={handleTheme}
          />
          {token && firstName ? (
            <>
              <Link
                href="/profile"
                className="px-4 text-primary hover:text-bright hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-bright hover:mr-2 flex items-center"
              >
                <RiUserSmileFill className="mr-2" /> {firstName}
              </Link>
              <Link
                href="/profile"
                className="px-4 text-primary hover:text-bright hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-bright hover:mr-2 flex items-center"
              >
                <IoMdCart className="mr-2" /> Cart
              </Link>
              <button
                onClick={handleSignout}
                className="px-4 text-white bg-primary border-2 rounded-md border-primary p-2 hover:cursor-pointer hover:shadow-lg flex items-center hover:bg-bright hover:border-bright"
              >
                <FaUser className="mr-2" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-4 text-primary hover:text-bright hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-bright hover:mr-2 flex items-center"
              >
                <FaUser className="mr-2" /> Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 text-white hover:bg-bright bg-primary border-2 rounded-md border-primary hover:border-bright p-2 hover:cursor-pointer hover:shadow-lg flex items-center"
              >
                <MdOutlineFollowTheSigns className="mr-2" /> Sign Up
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <MdDarkMode
            className="mr-4 text-lg hover:cursor-pointer hover:text-bright"
            onClick={handleTheme}
          />
          <button
            onClick={toggleMenu}
            className="text-primary hover:text-bright"
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
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start bg-white px-4 py-2 shadow-md">
          <Link
            href="/product"
            className="px-4 py-2 text-secondary font-medium text-lg hover:text-bright flex items-center w-full"
            onClick={toggleMenu}
          >
            <AiFillProduct className="mr-2" />
            Products
          </Link>
          <Link
            href="/wholesale"
            className="px-4 py-2 text-secondary font-medium text-lg hover:text-bright flex items-center w-full"
            onClick={toggleMenu}
          >
            <FaBoxOpen className="mr-2" />
            Wholesale
          </Link>
          <Link
            href="/help"
            className="px-4 py-2 text-secondary font-medium text-lg hover:text-bright flex items-center w-full"
            onClick={toggleMenu}
          >
            <GrFireball className="mr-2" />
            Help
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 text-secondary font-medium text-lg hover:text-bright flex items-center w-full"
            onClick={toggleMenu}
          >
            <IoPeopleCircle className="mr-2" />
            About
          </Link>
          {token && firstName ? (
            <>
              <Link
                href="/profile"
                className="px-4 py-2 text-primary hover:text-bright hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-bright flex items-center w-full"
                onClick={toggleMenu}
              >
                <RiUserSmileFill className="mr-2" /> {firstName}
              </Link>
              <Link
                href="/profile"
                className="px-4 py-2 text-primary hover:text-bright hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-bright flex items-center w-full"
                onClick={toggleMenu}
              >
                <IoMdCart className="mr-2" /> Cart
              </Link>
              <button
                onClick={() => {
                  handleSignout();
                  toggleMenu();
                }}
                className="px-4 py-2 text-white bg-primary border-2 rounded-md border-primary flex items-center w-full hover:cursor-pointer hover:shadow-lg hover:bg-bright hover:border-bright"
              >
                <FaUser className="mr-2" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-4 py-2 text-primary hover:text-bright hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-bright flex items-center w-full"
                onClick={toggleMenu}
              >
                <FaUser className="mr-2" /> Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-white hover:bg-bright bg-primary border-2 rounded-md border-primary hover:border-bright flex items-center w-full hover:cursor-pointer hover:shadow-lg"
                onClick={toggleMenu}
              >
                <MdOutlineFollowTheSigns className="mr-2" /> Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
