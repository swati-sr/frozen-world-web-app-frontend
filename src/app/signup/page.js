"use client";
import React from "react";
import Image from "next/image";
import girlEating from "../../../public/girlEating.png";
import { useRef, useState } from "react";
import { checkValidation } from "@/utils/validate";
import Link from "next/link";

const SignUp = () => {
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useState(null);
  const contact = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignUpSubmit = () => {
    const validationCheckMsg = checkValidation(
      email.current?.value,
      password.current?.value,
      fullName.current?.value,
      contact.current?.value
    );
    setErrorMsg(validationCheckMsg);
    if (validationCheckMsg) return;
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
            <label className="text-sm">Paasword</label>
            <input
              ref={password}
              type="text"
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
