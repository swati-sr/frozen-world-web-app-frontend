import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Card = ({ productImage, heading, id }) => {
  const router = useRouter();
  const handleViewButton = (id) => {
    router.push(`/product?id=${id}`);
  };

  return (
    <div className="flex items-center gap-5 m-6 bg-white border border-primary rounded shadow-lg w-[70%] py-12 px-8 hover:cursor-pointer hover:shadow-xl hover:shadow-secondary hover:border-none">
      <Image src={productImage} alt="food product" width={128} height={128} />
      <div className="mt-2 text-center">
        <h2 className="text-lg font-bold mb-2">{heading}</h2>
        <button
          className="mt-2 px-6 py-2 bg-bright text-white rounded-md"
          onClick={() => handleViewButton(id)}
        >
          View Items
        </button>
      </div>
    </div>
  );
};

export default Card;
