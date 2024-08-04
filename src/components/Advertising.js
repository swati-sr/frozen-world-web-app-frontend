import Image from "next/image";
import food from "../../public/wholesaleAd.png";

export const AdvertisingOne = () => {
  return (
    <div className="bg-red text-center py-4 shadow-xl relative overflow-hidden px-32">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-4xl font-semibold text-white mr-8">Why Frozen World?</h2>
        <Image src={food} alt="wholesale-items" className="-rotate-90" />
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-evenly text-white">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">What's Life Without Taste?</h3>
          <p>
            Discover a world of culinary delights at Frozen World! With just one click, you can explore our vast selection of gourmet food products from Indian, Japanese, Oriental, Italian, French, Continental, and Mediterranean cuisines. Enjoy the convenience of ready-to-cook meals delivered straight to your doorstep, making it easy to savor delicious, home-cooked meals every day.
          </p>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Why Frozen World?</h3>
          <p>
            Dining out every day isn't practical for everyone—it's time-consuming and expensive. What if you could savor restaurant-quality meals at home without breaking the bank? At our online gourmet food store, you can indulge in diverse cuisines from the world's food capitals. Enjoy the convenience and variety by ordering your favorites from us today!
          </p>
        </div>
      </div>
    </div>
  );
};
