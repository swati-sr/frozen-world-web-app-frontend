"use client";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import boyEating from "../../../public/boyEating.png";
import { login } from "@/lib/features/authSlice";
import { signIn } from "@/utils/apis/api"; 

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

    if (!emailValue || !passwordValue) {
      setErrorMsg("Email and password are required.");
      return;
    }

    setLoading(true);
    setErrorMsg(null); 

    try {
      const payload = {
        username: emailValue,
        password: passwordValue,
      };

      const json = await signIn(payload); 
      if (json.success) {
        const {
          email,
          firstName,
          lastName,
          phoneNumber,
          imageURL,
          accessGrade,
          city,
          address,
          state,
          pincode,
        } = json.data.user;

        document.cookie = `access_token=${json.data.access_token}; path=/`;

        dispatch(
          login({
            grade: accessGrade,
            email,
            phoneNumber,
            firstName,
            lastName,
            city,
            address,
            stateLocation: state,
            pincode,
            image: imageURL,
            token: json.data.access_token,
          })
        );

        setSuccess(true);
        router.push("/");
      } else {
        setErrorMsg(json.error.message || "An unexpected error occurred.");
      }
    } catch (error) {
      setErrorMsg(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green p-6">
      <Link
        href="/"
        className="absolute shadow-md top-5 left-5 bg-white py-2 px-4 text-yellow font-semibold rounded-md hover:bg-yellow hover:text-white"
      >
        Home
      </Link>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-6 bg-white shadow-lg">
        <div className="mb-8 md:mb-0 md:mr-8">
          <Image
            className=""
            src={boyEating}
            alt="boy-eating-food"
            loading="eager"
            priority={true}
            width={400}
            height={400}
          />
        </div>
        <form
          className="p-6 bg-gray-100 flex flex-col items-center w-full md:w-1/2"
          onSubmit={handleSignInSubmit}
        >
          <h1 className="font-bold text-2xl py-3 text-darkText">
            Welcome Back to Frozen World
          </h1>
          {loading && (
            <h3 className="text-md font-medium bg-blue-300 py-1 text-center shadow-lg shadow-gray-600 w-full">
              Work in progress... ⏱
            </h3>
          )}
          {success && (
            <h3 className="text-md font-medium bg-green-300 py-1 text-center shadow-lg shadow-gray-600 w-full">
              & Done 😎
            </h3>
          )}
          <div className="my-2 w-full">
            <label className="text-sm text-gray-700">Email Address</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter the e-mail address"
              className="w-full my-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bright"
            />
          </div>
          <div className="my-2 w-full">
            <label className="text-sm text-gray-700">Password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter the password"
              autoComplete="on"
              className="w-full my-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bright"
            />
            {errorMsg && (
              <em className="text-red-700 font-bold pt-1 text-sm">
                {errorMsg}
              </em>
            )}
          </div>
          <button
            type="submit"
            className="bg-darkGreen text-white py-2 px-6 rounded-md mt-4 w-full shadow-md hover:bg-yellow transition duration-300"
          >
            Submit
          </button>
          <div className="flex gap-2 mt-4 justify-center">
            <h3 className="font-medium text-darkText">
              Don't have an account yet?
            </h3>
            <span className="text-darkGreen font-medium hover:text-yellow">
              <Link href="/signup">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
