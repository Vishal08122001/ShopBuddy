import React, { createContext, useState } from "react";
import productdata from "../data/ProductData.json";

const MyContext = createContext();
const MyContextProvider = ({ children }) => {
  const [data, setData] = useState(productdata);

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider, MyContext };
