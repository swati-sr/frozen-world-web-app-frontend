import React from "react";
import Image from "next/image";
import pizza from "../../public/pizza.png";

const FirstContainer = () => {
  return (
    <div className="flex justify-around my-10 px-10">
      <div className="mt-20">
        <h1 className="font-bold text-5xl">Chill Your World</h1>{" "}
        <span className="font-bold text-5xl">& Unveil Frozen Delights 🍨</span>
        <p className="my-8 text-lg">
          Taste the magic of frozen wonders today with our delicious frozen
          treat.
        </p>
        <button className="bg-bright py-2 px-5 rounded-md text-white text-base">
          Know More
        </button>
      </div>
      <Image className={`${"spin-slow"} py-16`} src={pizza} alt="food-image" />
    </div>
  );
};

export default FirstContainer;
