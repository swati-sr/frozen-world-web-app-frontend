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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  if (!token || tokenFromCookie !== token) redirect("/signin");

  async function handlePhotoChange(e) {
    try {
      const file = e.target.files[0];
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/user/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenFromCookie}`,
        },
        body: formData,
      });

      if (!response.ok) {
        setErrorMsg("Network response was not ok");
      }
      const json = await response.json();
      if (json.success) {
        setAvatarImg(json.data.imageURL);
        dispatch(
          updateUser({
            image: json.data.imageURL,
          })
        );
      }
    } catch (error) {
      setErrorMsg(error);
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
      setLoading(true);
      setSuccess(false);
      const response = await fetch(`${API_BASE_URL}/user/updateUser`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenFromCookie}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setErrorMsg("Network response was not ok");
      }
      const json = await response.json();
      if (json.success) {
        dispatch(
          updateUser({
            phoneNumber: contact,
            firstName: name,
            lastName: initial,
            image: avatarImg,
          })
        );
      }
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setErrorMsg(error);
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
          {errorMsg && (
            <h3 className="text-md font-medium bg-red-300 py-1 text-center shadow-lg shadow-gray-600">
              errorMsg 🔴😟🔴
            </h3>
          )}
          {loading && (
            <h3 className="text-md font-medium bg-blue-300 py-1 text-center shadow-lg shadow-gray-600">
              Work in progress.. ⏱
            </h3>
          )}
          {success && (
            <h3 className="text-md font-medium bg-green-300 py-1 text-center shadow-lg shadow-gray-600">
              & Done 😎
            </h3>
          )}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 p-1 bg-gray-300 rounded-full shadow-md">
              <Image
                src={avatarImg ? avatarImg : userImage}
                alt="user-avatar"
                width={192}
                height={192}
                className="rounded-full w-full h-full object-cover"
              />
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handlePhotoChange(e)}
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
