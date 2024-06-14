import IconFacebookCircleFill from "@/icons/fb";
import React from "react";
import Link from "next/link";
import IconBxlInstagramAlt from "@/icons/instagram";

function Footer() {
  return (
    <div className="bg-primary">
      <div className="w-10/12 my-0 mx-auto p-4 flex flex-col text-white capitalize">
        <h1 className="font-bold text-3xl mt-4">
          <Link href="/" className="hover:text-bright">
            Frozen World.
          </Link>
        </h1>
        <div className="flex justify-between mt-8">
          <div className="grid grid-cols-3 gap-12">
            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <ul className="text-zinc-600 font-medium text-lg">
                <li className="hover:text-white hover:cursor-pointer">
                  Our Customer
                </li>
                <li className="hover:text-white hover:cursor-pointer">Legal</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
              <ul className="text-zinc-600 font-medium text-lg">
                <li className="hover:text-white hover:cursor-pointer">
                  Partner
                </li>
                <li className="hover:text-white hover:cursor-pointer">
                  Reviews
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Help</h4>
              <ul className="text-zinc-600 font-medium text-lg">
                <li className="hover:text-white hover:cursor-pointer">
                  Support
                </li>
                <li className="hover:text-white hover:cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Social Media</h4>
            <div className="flex justify-evenly">
              <span className="bg-bright hover:bg-white text-white hover:text-primary cursor-pointer p-2 rounded-sm">
                <Link href="www.facebook.com" className="text-xl">
                  <IconFacebookCircleFill />
                </Link>
              </span>
              <span className="bg-bright hover:bg-white text-white hover:text-primary cursor-pointer p-2 rounded-sm">
                <Link href="www.instagram.com" className="text-xl">
                  <IconBxlInstagramAlt />
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-white opacity-70 my-5"></div>
        <div className="flex justify-between items-center text-lg mb-4">
          <div>
            <p>Copyright © 2016 Frozen World. All Rights Reserved</p>
          </div>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms & Condition</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
