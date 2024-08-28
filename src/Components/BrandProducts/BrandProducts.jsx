
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { WishListData } from "@/Contexts/WishListData";
export default function BrandProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const{wishListDataSt,setWishListData,setwishListCount}=useContext(WishListData)

  const { id } = useParams();
  useEffect(() => {
    Products();
  }, []);
  console.log(id);
  async function Products() {
    setIsLoding(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data.data.filter((prod) => prod.brand._id == id));
        setIsLoding(false);
        console.log(products);
      });
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : products.length != 0 ? (
        <section className="py-[6rem]  text-center">
          <div className="container w-full md:w-4/5 m-auto  ">
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
                    wishlist={wishListDataSt} 
                    setWishList={setWishListData}
                    setwishListCount={setwishListCount}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <NotFound />
      )}
    </>
  );
}
