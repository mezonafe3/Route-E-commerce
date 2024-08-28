import {createContext, useEffect, useState } from "react";


export const CartData=createContext()

export default function  CartDataProvider({children}){

    const [cartData,setCartData]=useState(0)
    useEffect(()=>{
        if(localStorage.getItem("CartItemsNum")!=null){
            setCartData(localStorage.getItem("CartItemsNum"))
        }
    },[])
    return <CartData.Provider value={{cartData,setCartData}} >
            {children}
    </CartData.Provider>
}