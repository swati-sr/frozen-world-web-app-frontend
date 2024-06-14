import Image from "next/image";
import React from "react";
import cake from "../../public/cake.jpg";

const Items = ({ name, description, price, size, image }) => {
  return (
    <div className="flex justify-between bg-white">
      <div className="p-6">
        <h3 className="text-black font-semibold text-2xl">{name}</h3>
        <p className="my-6 w-10/12">{description}</p>
        <div className="flex gap-10">
          <span className="font-semibold text-lg">{price}</span>
          <span className="text-bright font-semibold">{size}</span>
        </div>
      </div>
      <div className="w-[140px] h-full">
        <Image
          src={cake}
          alt="item-image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Items;
