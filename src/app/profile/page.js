"use client";
import Header from "@/components/Header";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import userImage from "../../../public/userImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/lib/features/authSlice";
import { API_BASE_URL } from "@/utils/constants";
import AdminTabs from "@/components/AdminTabs";
import ImageBox from "@/components/ImageBox";

const Page = () => {
  const tokenFromCookie = Cookies.get("access_token");
  const dispatch = useDispatch();

  const {
    grade,
    firstName,
    lastName,
    email,
    image,
    phoneNumber,
    address,
    city,
    stateLocation,
    pincode,
    token,
  } = useSelector((store) => store.auth);

  if (!token || tokenFromCookie !== token) redirect("/signin");

  const [name, setName] = useState(firstName || "");
  const [initial, setInitial] = useState(lastName || "");
  const [avatarImg, setAvatarImg] = useState(image || "");
  const [contact, setContact] = useState(phoneNumber || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(address || "");
  const [currentCity, setCurrentCity] = useState(city || "");
  const [currentState, setCurrentState] = useState(stateLocation || "");
  const [postalCode, setPostalCode] = useState(pincode || "");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (grade === "ADMIN") {
      setIsAdmin(true);
    }
  }, [grade]);

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
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      if (json.success) {
        dispatch(
          updateUser({
            phoneNumber: contact,
            firstName: name,
            lastName: initial,
            address: currentAddress,
            city: currentCity,
            stateLocation: currentState,
            pincode: postalCode,
          })
        );
      }
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      <Header />
      <section className="mt-8 mb-4 px-4 sm:px-6 lg:px-8">
        {isAdmin ? (
          <AdminTabs isAdmin={isAdmin} />
        ) : (
          <h1 className="text-center text-primary text-4xl mb-6 font-bold">
            Profile
          </h1>
        )}
        <div className="max-w-lg mx-auto bg-formOne p-6 rounded-lg shadow-lg">
          {errorMsg && (
            <h3 className="text-md font-medium mb-2 bg-red-300 py-1 text-center shadow-lg">
              {errorMsg} 🔴😟🔴
            </h3>
          )}
          {loading && (
            <h3 className="text-md font-medium mb-2 bg-blue-300 py-1 text-center shadow-lg">
              Work in progress.. ⏱
            </h3>
          )}
          {success && (
            <h3 className="text-md font-medium mb-2 bg-green-300 py-1 text-center shadow-lg">
              & Done 😎
            </h3>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <ImageBox
              link={avatarImg || userImage}
              apiUrl={"user/upload"}
              title={"Change"}
              setLink={setAvatarImg}
            />
            <form
              className="flex-grow flex flex-col w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full my-2 py-2 px-4 font-medium rounded-md shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
                className="w-full my-2 py-2 px-4 font-medium rounded-md shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <input
                type="tel"
                placeholder="Contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full my-2 py-2 px-4 font-medium rounded-md shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <input
                type="email"
                placeholder="E-mail Id"
                disabled={true}
                value={email}
                className="w-full my-2 py-2 px-4 font-medium rounded-md shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
                className="w-full my-2 py-2 px-4 font-medium rounded-md shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <input
                type="text"
                placeholder="City"
                value={currentCity}
                onChange={(e) => setCurrentCity(e.target.value)}
                className="w-full my-2 py-2 px-4 font-medium rounded-md shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="State"
                  value={currentState}
                  onChange={(e) => setCurrentState(e.target.value)}
                  className="w-full my-2 py-2 px-4 font-medium rounded-md shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
                />
                <input
                  type="text"
                  placeholder="Pin Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full my-2 py-2 px-4 font-medium rounded-md shadow-md focus:ring-2 focus:ring-bright focus:border-formTwo"
                />
              </div>
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
