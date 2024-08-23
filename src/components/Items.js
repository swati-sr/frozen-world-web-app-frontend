import Image from "next/image";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const Items = ({ name, description, price, size, image }) => {
  return (
    <div className="bg-white border border-gray-300 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative h-40">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-900">{price}</span>
            <div className="flex gap-4">
              <span className="text-gray-600 font-medium text-lg pt-1">
                {size}
              </span>
              <FaCartShopping className="h-9 w-6 text-primary hover:text-bright hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
