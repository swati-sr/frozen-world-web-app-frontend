"use client";
import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import boyEating from "../../../public/boyEating.png";
import { useRef, useState } from "react";
import { checkSigninValidation } from "@/utils/validate";
import { API_BASE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  const handleSignInSubmit = async () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    try {
      const payload = {
        username: emailValue,
        password: passwordValue,
      };
      const response = await fetch(`${API_BASE_URL}/login`, {
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
        document.cookie = `access_token=${json.data.access_token}; path=/`;
        dispatch(
          login({
            user: emailValue,
            password: passwordValue,
            token: json.data.access_token,
          })
        );
        router.push("/");
        return json;
      } else {
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
      <div className="flex justify-evenly mt-36 py-4 align-middle">
        <Image src={boyEating} alt="boy-eating-food" />
        <form
          className="p-6 bg-formOne rounded-md flex-col items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="font-bold text-2xl py-3">
            Welcome Back to Frozen World.
          </h1>
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
            onClick={handleSignInSubmit}
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
