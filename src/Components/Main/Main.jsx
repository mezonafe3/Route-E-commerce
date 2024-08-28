import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import { ToastContainer, toast ,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "../Card/Card";
import img from "../../assets/images/shopping-cart-realistic_1284-6011-removebg-preview.png";
import Loading from "../Loading/Loading";
import { WishListData } from "@/Contexts/WishListData";
import { CartData } from "@/Contexts/CartDataContext";
import { useQuery } from "@tanstack/react-query";
export default function Main() {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoding] = useState(false);
  const { wishListDataSt, setWishListData ,wishListCount,setwishListCount} = useContext(WishListData);
  const{setCartData}=useContext(CartData)
  
 
  function AddToCartToast(){
    toast('Added To Cart Successfuly', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }
  function offline(){
    toast('you are offline', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }
  useEffect(() => {
    Products();
    GetWishListIds();
    CartDataCount();
  }, []);
  async function CartDataCount() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart",{
        headers:{
          token:localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        setCartData(data.numOfCartItems)

      });
  }
  async function Products() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  const data=useQuery({
    queryKey:['products'],
    queryFn:Products,
    staleTime:50000,
    refetchOnReconnect:true
  })
  
  
  async function GetWishListIds() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        console.log(data.count);
        setwishListCount(data.count)
        let items = [];
        data.data.map((item) => {
          items.push(item._id);
        });
        setWishListData(items);
      });
  }
  return (
    <>
      {data.isLoading ? (
        <Loading />
      ) : (
        <section className="py-[6rem]  text-center relative">
                <ToastContainer className="mt-14 "/>
                
          <div className="container w-full  m-auto  ">
            <div className="thumbnail  md:w-[85%] w-[90%] m-auto bg-[#119fd9] rounded-xl  flex items-center justify-center my-6">
              <img src={img} alt="" className="w-[20%]" />
              <p className="lg:text-4xl font-bold text-white font-poppins">
                Welcome To FreshCart
                <Offline onChange={Offline&&offline}></Offline>
              </p>
            </div>
            <div className="cards-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {data.data?.data.data.map((product, i) => {
                return (
                  <Card
                    key={i}
                    img={product.imageCover}
                    content={product.description}
                    price={product.price}
                    rate={product.ratingsAverage}
                    name={product.title}
                    id={product.id}
                    wishlist={wishListDataSt}
                    setWishList={setWishListData}
                    setwishListCount={setwishListCount}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
