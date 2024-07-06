"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminTabs = ({ isAdmin }) => {
  const path = usePathname();
  return (
    <div className="flex mx-auto justify-center gap-5 tabs mb-6">
      <Link className={path === "/profile" ? "active" : ""} href="/profile">
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/category" ? "active" : ""}
            href="/category"
          >
            Categories
          </Link>
          <Link className={path === "/users" ? "active" : ""} href="/users">
            Users
          </Link>
        </>
      )}
    </div>
  );
};

export default AdminTabs;
