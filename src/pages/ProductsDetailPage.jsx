import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ProductDetail from "../components/products/ProductDetail";
import Footer from "../components/common/footer";

const ProductsDetailPage = () => {
  return (
    <div>
      <Navbar />
      <ProductDetail />
      <Footer />
    </div>
  );
};

export default ProductsDetailPage;
