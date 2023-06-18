import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const [qty, setQty] = useState(1);
  const { cart, setCart, removeFromCart } = useContext(CartContext);

  let Total = 0;
  cart.forEach((element) => {
    Total =
      Total +
      Math.round(element.price * (1 - element.discountPercentage / 100));
  });

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleQty = (id, quantity) => {
    const updatedCart = cart.map((product) =>
      product.id === id ? { ...product, qty: quantity } : product
    );
    setQty(quantity);
    setCart(updatedCart);
  };
  return (
    <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white py-3">
      <div className="mt-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 flex justify-start mb-3">
          Cart
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
                        <h3>
                          <a href={`/productdetail/${product.id}`}>
                            {product.title}
                          </a>
                        </h3>
                        <p className="ml-4">
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          ) * product.qty}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="Qty"
                          className="inline mx-3 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          onClick={(e) => {
                            handleQty(product.id, e.target.value);
                          }}
                          className=" rounded-lg border border-gray-400"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={(e) => {
                            handleRemove(product.id);
                          }}
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
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p className="text-2xl font-bold tracking-tight text-gray-900">
            $ {Total * qty}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
