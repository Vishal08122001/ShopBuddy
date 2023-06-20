import React, { useContext } from "react";
import { MyContext } from "../../Context/ProductContext";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Modal from "../Modal/Modal";

const sortOptions = [
  { name: "Best Rating", current: false },
  { name: "Price: Low to High", current: false },
  { name: "Price: High to Low", current: false },
];

const filters = [
  {
    id: "category",
    name: "Filters",
    options: [
      { value: "smartphones", label: "smartphones", checked: false },
      { value: "laptops", label: "laptops", checked: false },
      { value: "fragrances", label: "fragrances", checked: false },
      { value: "skincare", label: "skincare", checked: false },
      { value: "groceries", label: "groceries", checked: false },
      { value: "home-decoration", label: "home-decoration", checked: false },
    ],
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { data } = useContext(MyContext);
  const { cart, addToCart } = useContext(CartContext);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState({
    head: "",
    body: "",
  });

  // Filter data based on selected filters
  const filteredData = data.filter((product) => {
    if (selectedFilters.length > 0) {
      return selectedFilters.some((selectedFilter) =>
        product.category.includes(selectedFilter)
      );
    }
    return true;
  });

  // Sort data based on selected sort option
  const sortedData = [...filteredData].sort((a, b) => {
    if (selectedSortOption === "Best Rating") {
      return b.rating - a.rating;
    } else if (selectedSortOption === "Price: Low to High") {
      return a.price - b.price;
    } else if (selectedSortOption === "Price: High to Low") {
      return b.price - a.price;
    }
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      setShowModal(true);
      setMsg({ head: "Oops!", body: "Sorry, Item is already in Cart." });
    } else {
      addToCart(product);
      setShowModal(true);
      setMsg({
        head: "Congratulations!",
        body: "Item added in Cart. ThankYou!",
      });
    }
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Filter</h3>
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onClick={(e) => {
                                        if (e.target.checked) {
                                          setSelectedFilters((prevFilters) => [
                                            ...prevFilters,
                                            option.value,
                                          ]);
                                        } else {
                                          setSelectedFilters((prevFilters) =>
                                            prevFilters.filter(
                                              (filter) =>
                                                filter !== option.value
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              All Products
            </h2>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={(e) => {
                                setSelectedSortOption(option.name);
                              }}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="data-heading" className="pb-24 pt-6">
            <h2 id="data-heading" className="sr-only">
              All Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Filters</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setSelectedFilters((prevFilters) => [
                                        ...prevFilters,
                                        option.value,
                                      ]);
                                    } else {
                                      setSelectedFilters((prevFilters) =>
                                        prevFilters.filter(
                                          (filter) => filter !== option.value
                                        )
                                      );
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {" "}
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
                      {currentProducts.map((product) => (
                        <div key={product.id}>
                          <Link to={`/productdetail/${product.id}`}>
                            <div
                              className=" relative border-solid border-2 p-2"
                              style={{ borderRadius: "10px" }}
                            >
                              <div className="min-h-50 min-w-50 max-h-45 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                  src={product.thumbnail}
                                  alt={product.images[0]}
                                  className="min-h-60  h-full w-full  object-cover object-center lg:h-full lg:w-full"
                                />
                              </div>
                              <div className="mt-4  flex justify-between">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                    <button>
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                      />
                                      {product.title}
                                    </button>
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500 flex justify-start align-middle">
                                    <StarIcon className="w-6 h-6 inline" />
                                    <span
                                      className="align-middle pt-1 mx-1"
                                      style={{ alignItems: "center" }}
                                    >
                                      {product.rating}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-sm font-medium text-gray-900 ">
                                    $
                                    {Math.round(
                                      product.price *
                                        (1 - product.discountPercentage / 100)
                                    )}
                                  </p>
                                  <p className="text-sm font-medium text-gray-400 line-through pb-3 pt-1">
                                    ${product.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <form className="mt-1">
                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(product)}
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Add to Cart
                            </button>
                          </form>
                        </div>
                      ))}
                    </div>
                    {showModal && (
                      <Modal
                        show={showModal}
                        setShow={setShowModal}
                        msg={msg}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pagination */}
          <nav className="flex justify-end pb-8" aria-label="Pagination">
            <ul className="inline-flex items-center">
              <button
                className="text-gray-500 hover:bg-gray-200 hover:text-gray-800  px-2 py-2 border border-gray-300 text-sm font-medium"
                style={{
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
                onClick={(e) => {
                  setCurrentPage(currentPage - 1);
                }}
                disabled={currentPage == 1}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {Array.from({
                length: Math.ceil(sortedData.length / productsPerPage),
              }).map((_, index) => (
                <li key={index}>
                  <button
                    className={classNames(
                      index === currentPage - 1
                        ? "bg-gray-200 text-gray-800"
                        : "text-gray-500 hover:bg-gray-200 hover:text-gray-800",
                      "px-4 py-2 border border-gray-300 text-sm font-medium"
                    )}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <button
                className="text-gray-500 hover:bg-gray-200 hover:text-gray-800  px-2 py-2 border border-gray-300 text-sm font-medium"
                style={{
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
                onClick={(e) => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(sortedData.length / productsPerPage)
                }
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </ul>
          </nav>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
