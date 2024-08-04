import React from "react";
import Image from "next/image";
import pizza from "../../public/pizza.png";
import food from "../../public/food4.png";
import { useRouter } from "next/navigation";

const FirstContainer = () => {
  const router = useRouter();
  const handleBtn = () => {
    router.push("/wholesale");
  };

  return (
    <div className="flex flex-col md:flex-row items-center h-screen px-32 w-full bg-yellow">
      <div className="md:mt-0 md:w-1/2 px-4">
        <h1 className="font-bold text-4xl text-white">
          Discover delights from <span className="text-[#de2348]">Frozen World</span>
        </h1>
        <span className="font-bold text-lg text-white">
          India's top importer of premium Thai, Korean, and Japanese foods.
        </span>
        <p className="my-8 text-lg font-medium text-white">
          Our expert team ensures every product is a global favorite.
        </p>
        <button
          className="border border-white py-2 px-5 rounded-md text-white text-base hover:border-none hover:bg-[#de2348] hover:cursor-pointer"
          onClick={handleBtn}
        >
          Know More
        </button>
      </div>
      <div className="py-8 md:py-0 md:w-1/2 flex justify-center">
        <Image
          className="spin-slow h-[35vh] w-[35vh] md:h-[50vh] md:w-[50vh] relative md:left-[16%]"
          src={food}
          alt="Gourmet food image"
        />
      </div>
    </div>
  );
};

export default FirstContainer;
