"use client";
import React from "react";
import ClientCard from "./ClientCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Brand = () => {
  const brands = [
    {
      id: 1,
      name: "Brand 1",
      description: "Description 1",
      imageUrl: "/images/brand1.png",
      link: "https://brand1.com",
    },
    {
      id: 2,
      name: "Brand 2",
      description: "Description 2",
      imageUrl: "/images/brand2.png",
      link: "https://brand2.com",
    },
    {
      id: 3,
      name: "Brand 2",
      description: "Description 2",
      imageUrl: "/images/brand2.png",
      link: "https://brand2.com",
    },
    {
      id: 4,
      name: "Brand 2",
      description: "Description 2",
      imageUrl: "/images/brand2.png",
      link: "https://brand2.com",
    },
    {
      id: 5,
      name: "Brand 2",
      description: "Description 2",
      imageUrl: "/images/brand2.png",
      link: "https://brand2.com",
    },
    // Add more brands as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center py-10">
      <h2 className="my-4 text-4xl text-primary font-medium">
        Our Corporate Clients
      </h2>
      <div className="w-full max-w-6xl my-7">
        <Slider {...settings} className="">
          {brands.map((brand) => (
            <ClientCard key={brand.id} brand={brand} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Brand;
