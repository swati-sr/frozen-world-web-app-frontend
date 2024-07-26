import Image from "next/image";
import grocery from "../../public/grocery.png";
import groceryTwo from "../../public/groceryTwo.png";

export const AdvertisingOne = () => {
  return (
    <div className="bg-gray-100">
      <div className="justify-center items-center">
        <Image src={groceryTwo} />
      </div>
    </div>
  );
};
