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
    <div className="bg-primary w-64 text-white flex flex-col min-h-screen shadow-lg">
      <div className="p-6 font-bold text-xl border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-6">
        <ul className="flex flex-col space-y-2">
          <li
            className={`transition-colors duration-300 py-2 px-4 rounded-md cursor-pointer ${
              path === "/"
                ? "bg-bright text-white font-semibold"
                : "hover:bg-gray-700"
            }`}
            onClick={() => handleNavigation("/")}
          >
            Home
          </li>
          <li
            className={`transition-colors duration-300 py-2 px-4 rounded-md cursor-pointer ${
              path === "/profile"
                ? "bg-bright text-white font-semibold"
                : "hover:bg-gray-700"
            }`}
            onClick={() => handleNavigation("/profile")}
          >
            Profile
          </li>
          {isAdmin && (
            <>
              <li
                className={`transition-colors duration-300 py-2 px-4 rounded-md cursor-pointer ${
                  path === "/category"
                    ? "bg-bright text-white font-semibold"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleNavigation("/category")}
              >
                Category
              </li>
              <li
                className={`transition-colors duration-300 py-2 px-4 rounded-md cursor-pointer ${
                  path === "/users"
                    ? "bg-bright text-white font-semibold"
                    : "hover:bg-gray-700"
                }`}
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
