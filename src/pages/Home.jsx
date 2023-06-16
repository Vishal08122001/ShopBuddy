import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../components/products/ProductList";
import Footer from "../components/common/footer";

const Home = () => {
  return (
    <div>
      <div>
        <Navbar>
          <ProductList />
        </Navbar>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
