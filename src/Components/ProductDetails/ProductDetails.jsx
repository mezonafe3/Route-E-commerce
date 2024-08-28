import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import { ToastContainer, toast ,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MySlider from "../mySlider/mySlider";
import { CartData } from "../../Contexts/CartDataContext";
import Card from "../Card/Card";
import { WishListData } from "@/Contexts/WishListData";
export default function ProductDetails() {
  const { setCartData } = useContext(CartData);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { wishListDataSt, setWishListData,setwishListCount} = useContext(WishListData);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  function AddToCartToast(){
    toast.success('Added To Cart Successfuly', {
      position: "top-right",
      autoClose: 5000,
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
    getProductDetailsById();
  }, [id]);
  useEffect(() => {
    getProductDetailsById();
  }, []);
  useEffect(() => {
    RelatedProducts(product?.category._id);
  }, [product]);
  async function RelatedProducts(id) {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setRelatedProducts(data.data.filter((prod) => prod.category._id == id));
        console.log(relatedProducts);
      });
  }
  async function getProductDetailsById() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products/" + id)
      .then(({ data }) => {
        setProduct(data.data);
        setHeroImage(data.data.imageCover);
      });
  }
  async function AddToCart(productId) {
    setIsLoading(true);
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false);
    AddToCartToast()
    setCartData(data.numOfCartItems);
    localStorage.setItem("CartItemsNum", data.numOfCartItems);
  }

  return (
    <>
      <section className="py-32 relative">
        <ToastContainer className="mt-16" />
        <div className="container w-full lg:w-4/5 m-auto flex flex-col md:flex-row justify-center gap-8 flex-wrap">
          <div className="slider md:w-2/5 flex flex-col  justify-center items-center border-slate-400">
            <div className="w-72 md:w-[80%] lg:w-[60%]">
              <Slider {...settings}>
                {product?.images.map((img, i) => {
                  return (
                    <img
                      key={i}
                      src={img}
                      onClick={() => setHeroImage(img)}
                      alt=""
                      className=" border-slate-400  shadow-lg cursor-pointer "
                    />
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="info md:w-2/5 py-3 px-3 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-3 self-start font-lato">
              {product?.title}
            </h2>
            <div className="container p-0">
              <p className="my-3 font-poppins font-light">
                {product?.description}
              </p>
              <p className="my-3 font-bold">EGP {product?.price}</p>
              <div className="sizes flex ">
                <button className="p-3 bg-white  size-10 flex items-center justify-center rounded-sm shadow-md">
                  Sm
                </button>
                <button className="p-3 bg-white ms-3 size-10 flex items-center justify-center rounded-sm shadow-md">
                  L
                </button>
                <button className="p-3 bg-white ms-3 size-10 flex items-center justify-center rounded-sm shadow-md">
                  xL
                </button>
                <button className="p-3 bg-white ms-3 size-10 flex items-center justify-center rounded-sm shadow-md">
                  XXL
                </button>
              </div>
              <button
                className={
                  !isLoading
                    ? "py-2 mt-5 md:scale-[1] w-full mt-3 shadow-lg bg-[#119fd9]  text-white rounded-md"
                    : "py-2  mt-5 w-full mt-3 shadow-lg bg-[#97a6ac]  text-white rounded-md"
                }
                onClick={() => {
                  AddToCart(product._id);
                }}
              >
                Add to cart{" "}
                {!isLoading ? (
                  <i class="fa-solid fa-cart-shopping ml-2"></i>
                ) : (
                  <i class="fa-solid fa-cart-shopping  ml-2 fa-spin"></i>
                )}
              </button>
            </div>
          </div>
          <div className="related-products w-full mt-10">
            <Carousel>
              <CarouselContent>
                {relatedProducts?.map((product, i) => {
                  return (
                    <CarouselItem className="lg:basis-1/5 md:basis-1/3 basis-1/2 my-5">
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
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}
