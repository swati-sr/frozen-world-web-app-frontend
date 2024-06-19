import React from "react";

const Discount = ({ offerBy, offerAmount }) => {
  const handleDialNumber = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };
  return (
    <div className="flex justify-evenly font-semibold">
      <div>
        Get {offerBy} discount on minimum purchase of Rs.{offerAmount} and above
      </div>
      <div>
        <button onClick={() => handleDialNumber("918442962861")}>
          📞 +91-8442-962861
        </button>{" "}
        |{" "}
        <button onClick={() => handleDialNumber("+918889108342")}>
          📞 +91-8889108342
        </button>{" "}
      </div>
    </div>
  );
};

export default Discount;
