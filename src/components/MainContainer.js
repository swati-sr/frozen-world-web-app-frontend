import React from "react";
import FirstContainer from "./FirstContainer";
import ProductContainer from "./ProductContainer";
import Header from "./Header";
import Footer from "./Footer";
import Brand from "./Brand";
import { AdvertisingOne } from "./Advertising";

const MainContainer = ({ isDarkMode }) => {
  return (
    <>
      <Header />
      <div className="px-32">
        <FirstContainer />
        <AdvertisingOne />
        <ProductContainer />
        <Brand />
      </div>
      <Footer />
    </>
  );
};

export default MainContainer;
