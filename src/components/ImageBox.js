import React, { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../utils/constants";

const ImageBox = ({ apiUrl, link, setLink, title }) => {
  const tokenFromCookie = Cookies.get("access_token");
  const [errorMsg, setErrorMsg] = useState("");

  async function handlePhotoChange(e) {
    try {
      const file = e.target.files[0];
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/${apiUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenFromCookie}`,
        },
        body: formData,
      });

      if (!response.ok) {
        setErrorMsg("Network response was not ok");
      } else {
        const json = await response.json();
        if (json.success) {
          setLink(json.data.imageURL);
        } else {
          setErrorMsg(json.message || "Upload failed");
        }
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center p-1">
      <div className="relative w-44 h-44 rounded-full overflow-hidden mb-4">
        {link && (
          <Image
            src={link}
            alt="Uploaded"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        )}
      </div>
      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden "
          onChange={handlePhotoChange}
          accept="image/*"
        />
        <span className="font-bold text-primary text-base border border-primary px-2 py-1 rounded-md hover:bg-bright hover:text-white hover:border-none">
          {title}
        </span>
      </label>
    </div>
  );
};

export default ImageBox;
