"use client";
import Header from "@/components/Header";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import userImage from "../../../public/userImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/lib/features/authSlice";
import { API_BASE_URL } from "@/utils/constants";

const Page = () => {
  const tokenFromCookie = Cookies.get("access_token");
  const dispatch = useDispatch();
  const { firstName, lastName, email, image, phoneNumber, token } = useSelector(
    (store) => store.auth
  );
  const [name, setName] = useState(firstName || "");
  const [initial, setInitial] = useState(lastName || "");
  const [avatarImg, setAvatarImg] = useState(image || "");
  const [contact, setContact] = useState(phoneNumber || "");

  if (!tokenFromCookie || tokenFromCookie !== token) redirect("/signin");

  async function handlePhotoChange(e) {
    const files = e.target.files;
    const data = new FormData();
    data.set("files", files);
    if (files.length > 0) {
      await fetch(`${API_BASE_URL}/user/upload`, {
        method: "POST",
        body: data,
      });
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const payload = {
        phoneNumber: contact,
        email: email,
        firstName: name,
        lastName: initial,
        imageURL: avatarImg,
      };
      const response = await fetch(`${API_BASE_URL}/user/updateUser`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-primary text-4xl mb-6 font-bold">
          Profile{" "}
        </h1>
        <div className="max-w-lg mx-auto bg-formOne p-6 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 p-1 bg-gray-300 rounded-full shadow-md">
              <Image
                src={userImage}
                alt="user-avatar"
                width={192}
                height={192}
                className="rounded-full w-full h-full object-cover"
              />
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-primary py-1 px-3 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-bright">
                  Change
                </span>
              </label>
            </div>
            <form
              className="flex-grow flex flex-col w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full my-2 py-2 px-4 font-medium rounded-md  shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
                className="w-full my-2 py-2 px-4 font-medium rounded-md  shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <input
                type="tel"
                placeholder="Contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full my-2 py-2 px-4 font-medium rounded-md  shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <input
                type="email"
                placeholder="E-mail Id"
                disabled={true}
                value={email}
                className="w-full my-2 py-2 px-4 font-medium rounded-md shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <button
                type="submit"
                onClick={handleProfileUpdate}
                className="bg-bright text-white py-2 px-4 rounded-md mt-4 shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
