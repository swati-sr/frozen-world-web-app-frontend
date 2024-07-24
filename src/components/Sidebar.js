"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const Sidebar = ({ isAdmin }) => {
  const path = usePathname();
  const router = useRouter();

  const handleNavigation = (locate) => {
    router.push(locate);
  };

  return (
    <div className="bg-primary  w-64 text-white flex flex-col min-h-screen">
      <div className="p-6 font-bold text-xl">Admin Panel</div>
      <nav className="flex-1 p-6">
        <ul className="flex flex-col">
          <li
            className={`${
              path === "/" ? "active" : ""
            } py-2 cursor-pointer font-medium hover:text-bright hover:font-semibold`}
            onClick={() => handleNavigation("/")}
          >
            Home
          </li>
          <li
            className={`${
              path === "/profile" ? "active" : ""
            } py-2 cursor-pointer font-medium hover:text-bright hover:font-semibold`}
            onClick={() => handleNavigation("/profile")}
          >
            Profile
          </li>
          {isAdmin && (
            <>
              <li
                className={`${
                  path === "/category" ? "active" : ""
                }  py-2 cursor-pointer font-medium hover:text-bright hover:font-semibold`}
                onClick={() => handleNavigation("/category")}
              >
                Category
              </li>
              <li
                className={`${
                  path === "/users" ? "active" : ""
                }  py-2 cursor-pointer font-medium hover:text-bright hover:font-semibold`}
                onClick={() => handleNavigation("/users")}
              >
                Users
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
