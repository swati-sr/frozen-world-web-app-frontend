"use client";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import boyEating from "../../../public/boyEating.png";
import { login } from "@/lib/features/authSlice";
import { API_BASE_URL } from "@/utils/constants";

const SignIn = () => {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    // Basic validation
    if (!emailValue || !passwordValue) {
      setErrorMsg("Email and password are required.");
      return;
    }

    try {
      const payload = {
        username: emailValue,
        password: passwordValue,
      };
      setLoading(true);
      setSuccess(false);
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      if (json.success) {
        const { email, firstName, lastName, phoneNumber, imageURL } =
          json.data.user;
        document.cookie = `access_token=${json.data.access_token}; path=/`;
        dispatch(
          login({
            email,
            phoneNumber,
            firstName,
            lastName,
            image: imageURL,
            token: json.data.access_token,
          })
        );
        setSuccess(true);
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        setErrorMsg(json.error.message || "An unexpected error occurred.");
      }
    } catch (error) {
      setErrorMsg(error.message || "An unexpected error occurred.");
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
      <div className="flex justify-evenly mt-36 py-4 align-middle">
        <Image src={boyEating} alt="boy-eating-food" />
        <form
          className="p-6 bg-formOne rounded-md flex-col items-center"
          onSubmit={handleSignInSubmit}
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
            <label className="text-sm">Email Address</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter the e-mail address"
              className="w-full my-1 py-2 px-2 font-medium"
            />
          </div>
          <div className="my-2">
            <label className="text-sm">Paasword</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter the password"
              className="w-full my-1 py-2 px-2 font-medium"
            />
            {errorMsg && (
              <em className="text-red-700 font-bold pt-1 text-sm">
                {errorMsg}
              </em>
            )}
          </div>
          <button
            type="submit"
            className="bg-bright text-white py-1 px-6 rounded-md mt-1"
          >
            Submit
          </button>
          <div className="flex gap-4 mt-2">
            <h3 className="font-medium">Don't have an account yet?</h3>
            <span className="text-bright font-medium">
              <Link href="/signup">SignUp</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
