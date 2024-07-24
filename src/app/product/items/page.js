"use client";
import AdminTabs from "@/components/AdminTabs";
import Header from "@/components/Header";
import ImageBox from "@/components/ImageBox";
import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "@/utils/constants";
import { useRef, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { redirect } from "next/navigation";

const Page = () => {
  const token = Cookies.get("access_token");
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlId = searchParams.get("id");

  useEffect(() => {
    if (!token || !urlId) {
      redirect("/");
    }
  }, [token, urlId]);

  const [imageItem, setImageItem] = useState(null);
  const itemName = useRef(null);
  const itemDescription = useRef(null);
  const itemSize = useRef(null);
  const itemPrice = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: itemName.current.value,
        description: itemDescription.current.value,
        size: itemSize.current.value,
        price: itemPrice.current.value,
        category: urlId,
      };
      const response = await axios.post(`${API_BASE_URL}/product`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        router.push("/admin/products"); // Navigate to the products page after successful creation
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="mt-8 max-w-md mx-auto">
        <AdminTabs isAdmin={true} />
        <div className="bg-formOne p-4 rounded-md mb-4">
          <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
            <div className="flex gap-6 items-start">
              <div className="w-1/3">
                <ImageBox
                  link={imageItem}
                  apiUrl={`product/upload/${urlId}`}
                  title={"Upload"}
                  setLink={setImageItem}
                />
              </div>
              <div className="flex flex-col grow">
                <label className="text-sm font-medium text-secondary">
                  Product Item
                </label>
                <input
                  type="text"
                  className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
                  ref={itemName}
                />
                <label className="text-sm font-medium text-secondary pt-1">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
                  ref={itemDescription}
                />
                <label className="text-sm font-medium text-secondary pt-1">
                  Size
                </label>
                <input
                  type="text"
                  className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
                  ref={itemSize}
                />
                <label className="text-sm font-medium text-secondary pt-1">
                  Price
                </label>
                <input
                  type="text"
                  className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
                  ref={itemPrice}
                />
                <label className="text-sm font-medium text-secondary pt-1">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full pb-1 pt-2 px-4 font-medium rounded-md shadow-md"
                  value={urlId}
                  disabled
                />
                <div className="w-full mt-4 py-1 text-center px-1 font-medium rounded-md shadow-md border border-primary hover:bg-primary hover:text-white hover:cursor-pointer">
                  <button type="submit">Create</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
