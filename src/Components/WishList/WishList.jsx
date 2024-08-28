
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { ToastContainer, toast ,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from "../../assets/images/shopping-cart-realistic_1284-6011-removebg-preview.png";
import Loading from "../Loading/Loading";
import { WishListData } from "@/Contexts/WishListData";
export default function WishList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const { wishListDataSt, setWishListData, wishListCount, setwishListCount } =
    useContext(WishListData);

  useEffect(() => {
    Products();
  }, []);
  useEffect(() => {
    Products();
  }, [wishListCount]);
  async function Products() {
    setIsLoding(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setProducts(data.data);
        setIsLoding(false);
        
      });
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="py-[6rem]  text-center">
          <div className="container w-full  m-auto  ">
            <div className="cards-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {products.map((product, i) => {
                return (
                  <Card
                    key={i}
                    img={product.imageCover}
                    content={product.description}
                    price={product.price}
                    rate={product.ratingsAverage}
                    name={product.title}
                    id={product.id}
                    setWishList={setWishListData}
                    setwishListCount={setwishListCount}
                    Products={Products}
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
