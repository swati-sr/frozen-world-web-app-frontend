import Image from "next/image";
import React from "react";
import cake from "../../public/cake.jpg";

const Items = ({ name, description, price, size }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <Image
          src={cake}
          alt="item-image"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-black font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-700 mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">{price}</span>
          <span className="text-gray-600">{size}</span>
        </div>
      </div>
    </div>
  );
};

export default Items;
