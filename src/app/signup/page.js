"use client";
import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import girlEating from "../../../public/girlEating.png";
import { register } from "@/lib/features/authSlice";
import { signUp } from "@/utils/apis/api";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const email = createRef();
  const fullName = createRef();
  const contact = createRef();
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const [firstName, lastName] = fullName.current.value.split(" ");
    
    const payload = {
      email: email.current.value,
      phoneNumber: contact.current.value,
      firstName: firstName,
      lastName: lastName,
    };

    setLoading(true);
    setSuccess(false);

    try {
      const json = await signUp(payload);
      if (json.success) {
        dispatch(register({
          fullName: fullName.current.value,
          email: email.current.value,
          phoneNumber: contact.current.value,
        }));
        setSuccess(true);
        router.push("/signin");
      } else {
        setErrorMsg(json.error.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkGreen p-6">
      <Link href="/" className="absolute shadow-md top-5 left-5 bg-white py-2 px-4 text-darkGreen font-semibold rounded-md hover:bg-yellow hover:text-white">
        Home
      </Link>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-6 bg-white shadow-lg">
        <div className="mb-8 md:mb-0 md:mr-8 flex-shrink-0">
          <Image src={girlEating} alt="girl-eating-food" className="w-[18rem] h-[18rem] md:w-[23rem] md:h-[23rem]" loading="eager" priority={true} />
        </div>
        <form className="p-6 bg-gray-100 flex flex-col items-center w-full md:w-1/2" onSubmit={handleSignUpSubmit}>
          <h1 className="font-bold text-2xl py-3 text-darkText">Create Your Account</h1>
          {loading && <h3 className="text-md font-medium bg-blue-300 py-1 text-center shadow-lg shadow-gray-600">Work in progress... ⏱</h3>}
          {success && <h3 className="text-md font-medium bg-green-300 py-1 text-center shadow-lg shadow-gray-600">& Done 😎</h3>}
          <div className="my-2 w-full">
            <label className="text-sm text-gray-700">Full Name</label>
            <input ref={fullName} type="text" placeholder="Enter your full name" className="w-full my-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bright" />
          </div>
          <div className="my-2 w-full">
            <label className="text-sm text-gray-700">Contact</label>
            <input ref={contact} type="tel" placeholder="Enter your contact number" className="w-full my-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bright" />
          </div>
          <div className="my-2 w-full">
            <label className="text-sm text-gray-700">Email Address</label>
            <input ref={email} type="email" placeholder="Enter your email address" className="w-full my-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bright" />
          </div>
          {errorMsg && <div className="my-2 text-red-700 font-bold text-sm">{errorMsg}</div>}
          <button type="submit" className="bg-green text-black py-2 px-6 rounded-md mt-4 w-full shadow-md hover:bg-yellow transition duration-300 hover:text-white">Sign Up</button>
          <div className="flex gap-2 mt-4 justify-center">
            <h3 className="font-medium text-darkText">Already have an account?</h3>
            <span className="text-green font-medium hover:text-yellow">
              <Link href="/signin">Sign In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
