"use client";
import React from "react";
import Image from "next/image";
import girlEating from "../../../public/girlEating.png";
import { useRef, useState } from "react";
import { register } from "@/lib/features/authSlice";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const email = useRef(null);
  const fullName = useState(null);
  const contact = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUpSubmit = async () => {
    const [firstName, lastName] = fullName.current.value.split(" ");
    try {
      const payload = {
        email: email.current.value,
        phoneNumber: contact.current.value,
        firstName: firstName,
        lastName: lastName,
      };
      setLoading(true);
      setSuccess(false);
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      if (json.success) {
        dispatch(
          register({
            fullName: fullName.current.value,
            email: email.current.value,
            phoneNumber: contact.current.value,
          })
        );
        setSuccess(true);
        setLoading(false);
        router.push("/signin");
      } else {
        setLoading(false);
        setErrorMsg(json.error.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div>
      <Link
        href="/"
        className="absolute ml-[174px] top-[109px] bg-bright py-1 px-2 text-white rounded-md"
      >
        Home
      </Link>
      <div className="flex justify-evenly mt-[7rem]">
        <Image
          src={girlEating}
          alt="boy-eating-food"
          className="w-[23rem] h-[23rem] mt-10"
        />
        <form
          className="p-4 bg-formTwo rounded-md flex-col items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="font-bold text-2xl py-3">
            Welcome Back to Frozen World.
          </h1>
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
          <div className="my-2">
            <label className="text-sm">Full Name</label>
            <input
              ref={fullName}
              type="text"
              placeholder="Enter the full name"
              className="w-full my-1 py-2 px-2 font-medium"
            />
          </div>
          <div className="my-2">
            <label className="text-sm">Contact</label>
            <input
              ref={contact}
              type="tel"
              placeholder="Enter the contact number"
              className="w-full my-1 py-2 px-2 font-medium"
            />
          </div>
          <div className="my-2">
            <label className="text-sm">Email Address</label>
            <input
              ref={email}
              type="email"
              placeholder="Enter the e-mail address"
              className="w-full my-1 py-2 px-2 font-medium"
            />
          </div>
          <div className="my-2">
            {errorMsg && (
              <em className="text-red-700 font-bold pt-1 text-sm">
                {errorMsg}
              </em>
            )}
          </div>
          <button
            className="bg-bright text-white py-1 px-6 rounded-md mt-1"
            onClick={handleSignUpSubmit}
          >
            Submit
          </button>
          <div className="flex gap-4 mt-2">
            <h3 className="font-medium">Already a User?</h3>
            <span className="text-white font-medium">
              <Link href="/signin">SignIn</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
