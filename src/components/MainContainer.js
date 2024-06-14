import React from "react";
import FirstContainer from "./FirstContainer";
import ProductContainer from "./ProductContainer";
import Header from "./Header";
import Footer from "./Footer";

const MainContainer = () => {
  return (
    <>
      <Header />
      <FirstContainer />
      <ProductContainer />
      <Footer />
    </>
  );
};

export default MainContainer;
