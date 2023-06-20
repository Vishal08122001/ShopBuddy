import React from "react";
import Cart from "../components/Cart/Cart";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/common/footer";

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <Cart head={"Cart"} SubPart={true} />
      <Footer />
    </div>
  );
};

export default CartPage;
