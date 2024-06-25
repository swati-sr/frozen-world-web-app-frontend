"use client";
import AdminTabs from "@/components/AdminTabs";
import Header from "@/components/Header";
import React, { useState } from "react";
import ImageBox from "@/components/ImageBox";
import userImage from "../../../../public/userImage.jpg";

const page = () => {
  const [imageItem, setImageItem] = useState(null);
  return (
    <>
      <Header />
      <div className="mt-8 max-w-md mx-auto">
        <AdminTabs isAdmin={true} />
        <form className="mt-8 max-w-md mx-auto">
          <div className="flex gap-6 items-start">
            <div className="w-1/3">
              <ImageBox
                link={userImage}
                apiUrl={`product/`}
                title={"Change"}
                setLink={setImageItem}
              />
            </div>
            <div className="flex flex-col grow">
              <label className="text-base font-medium text-secondary">
                Product Item
              </label>
              <input
                type="text"
                className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
              />
              <label className="text-base font-medium text-secondary">
                Description
              </label>
              <input
                type="text"
                className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
              />
              <label className="text-base font-medium text-secondary">
                Size
              </label>
              <input
                type="text"
                className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
              />
              <label className="text-base font-medium text-secondary">
                Price
              </label>
              <input
                type="text"
                className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
              />
              <label className="text-base font-medium text-secondary">
                Category
              </label>
              <input
                type="text"
                className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
              />
              <div className="w-full mt-2 py-1 text-center px-1 font-medium rounded-md shadow-md border border-primary hover:bg-primary hover:text-white hover:cursor-pointer">
                <button type="submit">Create</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
