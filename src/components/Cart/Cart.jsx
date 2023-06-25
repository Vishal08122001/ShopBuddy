import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import React from "react";
import Modal from "../Modal/Modal";

export default function Cart({ head, SubPart }) {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState({
    head: "",
    body: "",
  });

  const handleRemove = (id) => {
    removeFromCart(id);
    setShowModal(true);
    setMsg({ head: "Done!", body: "Item removed from Cart." });
  };

  const handleQty = (id, quantity) => {
    const updatedCart = cart.map((product) =>
      product.id === id ? { ...product, qty: quantity } : product
    );
    setCart(updatedCart);
  };

  let subtotal = 0;
  cart.forEach((product) => {
    subtotal +=
      Math.round(product.price * (1 - product.discountPercentage / 100)) *
      product.qty;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white py-3">
      <div className="mt-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 flex justify-start mb-3">
          {head ? head : null}
        </h1>
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cart.length > 0 ? (
              cart.map((product) => (
                <li key={product.id} className="flex py-8 mb-4 ">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.thumbnail}
                      alt={product.image}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-lg">
                          <Link to={`/productdetail/${product.id}`}>
                            {product.title}
                          </Link>
                        </h3>
                        <p className="ml-4 text-lg">
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          ) * product.qty}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div
                        className="text-gray-500 flex justify-center  "
                        style={{ alignItems: "center" }}
                      >
                        <div className="flex justify-center ">
                          <button
                            onClick={() =>
                              handleQty(product.id, product.qty - 1)
                            }
                            disabled={product.qty === 1}
                            style={{
                              borderTopLeftRadius: "10px",
                              borderBottomLeftRadius: "10px",
                            }}
                            className="text-gray-500 hover:bg-gray-200 hover:text-gray-800
                                      px-3 py-1 border border-gray-300  font-bold text-xl"
                          >
                            -
                          </button>
                          <p
                            className="text-gray-500 hover:bg-gray-200 hover:text-gray-800
                      px-4 py-2 border font-bold border-gray-300 text-md"
                          >
                            {product.qty}
                          </p>
                          <button
                            onClick={() =>
                              handleQty(product.id, product.qty + 1)
                            }
                            disabled={product.qty === 10}
                            className="text-gray-500 hover:bg-gray-200 hover:text-gray-800
                      px-3 py-1 border border-gray-300 text-xl font-bold"
                            style={{
                              borderTopRightRadius: "10px",
                              borderBottomRightRadius: "10px",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => handleRemove(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <h1 className="text-2xl font-bold tracking-tight text-gray-500 flex justify-center mt-5 mb-5 p-8">
                Cart is Empty
              </h1>
            )}
          </ul>
          {showModal && (
            <Modal show={showModal} setShow={setShowModal} msg={msg} />
          )}
        </div>
      </div>

      {SubPart && (
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p className="text-2xl font-bold tracking-tight text-gray-900">
              ${subtotal}
            </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to={"/checkout"}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p className="-mt-4">
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
