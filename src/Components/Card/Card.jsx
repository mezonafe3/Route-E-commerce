import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartData } from "../../Contexts/CartDataContext";
import { data } from "autoprefixer";
import {toast ,Bounce , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Card({
  img,
  content,
  price,
  rate,
  name,
  id,
  wishlist,
  setWishList,
  setwishListCount,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setCartData } = useContext(CartData);
  const { pathname } = useLocation();
  const [isDeleting, setIsDeleting] = useState(false);
  const notify = () => toast("Wow so easy!");
  function DeletedToast(){
    toast('Deleted', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }
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
  function AddToWishListToast(){
    toast.success('Added To wishlist Successfuly', {
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
  async function addToWishList(productId) {
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        setWishList(data.data);
        setwishListCount(data.data.length);
        AddToWishListToast()
      });
  }
  async function deleteFromWishList(id) {
    setIsDeleting(true);
    console.log(id);

    await axios
      .delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + id, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setwishListCount(data.data.length);
        setIsDeleting(false);
       
      });
  }

  return (
    <>
      
      <div className="card py-1  rounded-md relative shadow-md">
      {/* <ToastContainer/> */}
        <div className="card-img p-5 relative">
          <Link to={"/ProductDetails/" + id}>
            <img src={img} alt="" className="w-full rounded-md shadow-xl" />
          </Link>
        </div>
        <div className="add-to-cart justify-around items-center flex absolute right-0 m-auto  left-0 -translate-y-[107%] ">
          <div className="rate scale-[0.7] md:scale-[1] flex items-center bg-[#119fd9] px-1 rounded-md shadow-lg text-white ">
            {[1, 2, 3, 4, 5].map((x, i) => {
              return (
                <i
                  key={i}
                  className={
                    rate >= x
                      ? "fa-solid fa-star fa-2xs text-yellow-400"
                      : "fa-solid fa-star fa-2xs text-gray-300 "
                  }
                ></i>
              );
            })}
            <p className="ms-1">{rate}</p>
          </div>
          <button
            onClick={() => {
              AddToCart(id);
            }}
            className={
              !isLoading
                ? "py-2 scale-[0.7] md:scale-[1] px-3 shadow-lg bg-[#119fd9]  text-white rounded-md"
                : "py-2 px-3 shadow-lg bg-[#97a6ac]  text-white rounded-md"
            }
          >
            {!isLoading ? (
              <i class="fa-solid fa-cart-shopping "></i>
            ) : (
              <i class="fa-solid fa-cart-shopping fa-spin"></i>
            )}
          </button>
        </div>

        <div className="content my-2 px-1 text-start w-4/5 m-auto text-sm ">
          <p className="text-lg font-bold line-clamp-1 font-roboto">{name}</p>
          <p className="line-clamp-2 font-bold font-lato text-[#696969d5]">
            {content}
          </p>
          <div className="price flex justify-between items-center">
            <h2>
              <span className="ont-lato text-[#696969d5]">EGP</span>{" "}
              <span className="font-bold">{price}</span>
            </h2>
            <i
              className={
                !pathname.includes("WishList")
                  ? wishlist?.includes(id)
                    ? "fa-solid fa-heart top-8 right-8 text-red-500 text-[20px] cursor-pointer"
                    : "fa-solid fa-heart top-8 right-8 text-slate-500 text-[20px] cursor-pointer"
                  : isDeleting
                  ? "fa-solid fa-x text-lg fa-beat"
                  : "fa-solid fa-x text-lg cursor-pointer"
              }
              onClick={() => {
                pathname.includes("WishList")
                  ? deleteFromWishList(id)
                  : addToWishList(id);
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
