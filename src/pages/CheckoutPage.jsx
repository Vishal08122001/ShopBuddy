import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Checkout from "../components/Checkout/Checkout";
import Footer from "../components/common/footer";

const CheckoutPage = () => {
  return (
    <div>
      <Navbar />
      <Checkout />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
