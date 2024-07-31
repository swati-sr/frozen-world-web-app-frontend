import Image from "next/image";
import grocery from "../../public/grocery.png";
import groceryThree from "../../public/groceryThree.png";

export const AdvertisingOne = () => {
  return (
    <div className="bg-bright text-center pt-8 shadow-xl text-primary">
      <h2 className="text-4xl font-semibold">What’s on your list today?</h2>
      <div className="justify-center items-center w-full">
        <Image src={groceryThree} className="w-full" />
      </div>
    </div>
  );
};
