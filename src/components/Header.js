import { WEB_APP_NAME } from "@/utils/constants";
import React from "react";

const Header = () => {
  return (
    <div className="m-3 py-2 px-1 flex justify-around">
      <h2 className="text-primary font-bold text-3xl">{WEB_APP_NAME}</h2>
      <div className="text-secondary font-medium text-lg pt-2">
        <span className="pr-4 hover:cursor-pointer hover:text-primary">
          Home
        </span>
        <span className="pr-4 hover:cursor-pointer hover:text-primary">
          Menu
        </span>
        <span className="pr-4 hover:cursor-pointer hover:text-primary">
          Services
        </span>
        <span className="pr-4 hover:cursor-pointer hover:text-primary">
          About
        </span>
      </div>
      <div className="pt-2 font-medium text-base">
        <span className="pr-3 text-primary hover:cursor-pointer hover:border-2 hover:rounded-md hover:px-5 hover:py-2 hover:border-primary hover:mr-2">
          Sign In
        </span>
        <span className="px-4 text-bright border-2 rounded-md border-bright p-2 hover:cursor-pointer hover:shadow-lg">
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default Header;
