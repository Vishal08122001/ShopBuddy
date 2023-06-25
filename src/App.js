import Home from "./pages/Home";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductsDetailPage from "./pages/ProductsDetailPage";
import { MyContextProvider } from "./Context/ProductContext";
import { CartProvider } from "./Context/CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/productdetail/:id",
    element: <ProductsDetailPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  {
    path: "checkout",
    element: <CheckoutPage />,
  },
]);
export default function App() {
  return (
    <CartProvider>
      <MyContextProvider>
        <RouterProvider router={router} />
      </MyContextProvider>
    </CartProvider>
  );
}
