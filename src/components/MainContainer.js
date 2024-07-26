import React from "react";
import FirstContainer from "./FirstContainer";
import ProductContainer from "./ProductContainer";
import Header from "./Header";
import Footer from "./Footer";
import Brand from "./Brand";
import { AdvertisingOne } from "./Advertising";

const MainContainer = () => {
  return (
    <>
      <Header />
      <AdvertisingOne />
      {/* <FirstContainer /> */}
      <ProductContainer />
      <Brand />
      <Footer />
    </>
  );
};

export default MainContainer;
