"use client";

import { useState } from "react";
import Header from "@/components/Header";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    organisationName: "",
    contact: "",
    email: "",
    description: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          organisationName: "",
          contact: "",
          email: "",
          description: "",
        });
      } else {
        setStatus("Failed to send the message. Please try again.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#de2348] min-h-screen pt-11">
        <div className="px-4 md:px-32 w-full">
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white flex flex-col">
            Help & Support
            <span className="text-sm md:text-base pt-2">
              We have proven records of best customer support.
            </span>
          </h2>
          <div className="px-4 md:px-11 py-11 bg-gray-100 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-lg font-semibold text-darkText mb-2">
              <h3 className="flex flex-col py-1 my-1">
                Address:{" "}
                <span className="text-base">
                  Sr. No. 43, 1B/1, Lane No. 1-D, Pathare - Thube Nagar,
                  Kharadi, Pune, Maharashtra 411014
                </span>
              </h3>
              <h3 className="flex flex-col py-1 my-1">
                Contact No:{" "}
                <span className="text-base">9823025666 / 9888412990</span>
              </h3>
              <h3 className="flex flex-col py-1 my-1">
                Email: <span className="text-base">vedantentp6@gmail.com</span>
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="organisationName"
                  value={formData.organisationName}
                  onChange={handleChange}
                  placeholder="Organisation Name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded-md h-48"
              />
              <button
                type="submit"
                className="w-full bg-darkText text-white p-2 rounded-md hover:bg-white hover:border hover:border-darkText hover:text-darkText focus:outline-none focus:ring-2 focus:ring-bright"
              >
                Send a Message
              </button>
            </form>
            {status && (
              <div className="mt-4 text-center text-lg text-white">
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
