import { FaExternalLinkSquareAlt } from "react-icons/fa";

export const ClientCard = ({ brand }) => {
  const { imageUrl, link } = brand;

  return (
    <div className="bg-white w-60 shadow-lg rounded-sm overflow-hidden transform hover:scale-105 transition-transform duration-300 relative mx-2">
      {link && (
        <button
          className="absolute top-2 right-2 bg-bright text-white p-2 rounded hover:bg-primary"
          onClick={() => window.open(link, "_blank")}
        >
          <FaExternalLinkSquareAlt />
        </button>
      )}
      <div className="flex justify-center items-center h-40">
        <img
          src={imageUrl}
          alt="Brand Logo"
          className="object-cover max-h-full"
        />
      </div>
    </div>
  );
};

export default ClientCard;
