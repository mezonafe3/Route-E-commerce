import { createContext, useState } from "react";

export const WishListData = createContext();

import React from "react";

export default function WishListDataProvider({ children }) {
  const [wishListDataSt, setWishListData] = useState([]);
  const [wishListCount,setwishListCount]=useState(0)
  return (
    <>
      <WishListData.Provider value={{ wishListDataSt, setWishListData,wishListCount,setwishListCount }}>
        {children}
      </WishListData.Provider>
    </>
  );
}
