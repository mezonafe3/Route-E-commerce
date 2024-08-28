import React, { useState } from 'react'
import Slider from 'react-slick'
import {CarouselItem} from "@/Components/ui/carousel"
import './slider.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
export default function MySlider({x}) {
  const [isLoading,setIsLoading]=useState(false)
  async function AddToCart(productId) {
    setIsLoading(true)
    const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
      productId
    },{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    setIsLoading(false)  
    // setCartData(data.numOfCartItems)
    // localStorage.setItem("CartItemsNum",data.numOfCartItems)
  }
                return (<>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5"  key={x.id}>
                 <div className="card rounded-md relative shadow-custom">
                <div className="card-img p-5 ">
                  <Link to={"/ProductDetails/"+x.id}>
                      <img src={x.imageCover} alt=""className='w-full rounded-md shadow-xl'/>
                  </Link>
                  
                </div>
                    <div className="add-to-cart justify-around items-center flex absolute right-0 m-auto  left-0 -translate-y-[107%] ">
                      <div className="rate scale-[0.7] md:scale-[1] flex items-center bg-[#119fd9] px-1 rounded-md shadow-lg text-white ">
                        {
                          [1,2,3,4,5].map((y,i)=>{
                            return <i key={i} className={x.ratingsAverage>=y?"fa-solid fa-star fa-2xs text-yellow-400":"fa-solid fa-star fa-2xs text-gray-300 "}></i>
                          })
                        }
                        <p className="ms-1">{x.ratingsAverage}</p>
                      </div>
                      <button onClick={()=>{
                        console.log(x.id)
                        AddToCart(x.id)
                      }} className={!isLoading?'py-2 scale-[0.7] md:scale-[1] px-3 shadow-lg bg-[#119fd9]  text-white rounded-md':'py-2 px-3 shadow-lg bg-[#97a6ac]  text-white rounded-md'}>
                        {!isLoading?<i class="fa-solid fa-cart-shopping "></i>:<i class="fa-solid fa-cart-shopping fa-spin"></i>}
                        </button>
                    </div>
  
                <div className="content my-2 px-1 text-start w-4/5 m-auto text-sm ">
                    <p  className='text-lg font-bold line-clamp-1 font-roboto'>{x.title}</p>
                    <p className='line-clamp-2 font-bold font-lato text-[#696969d5]'>{x.description}</p>
                    <div className="price">
                      <h2><span className="ont-lato text-[#696969d5]">EGP</span> <span className='font-bold'>{x.price}</span></h2>
                    </div>
                    </div>
              </div>
              </CarouselItem>
    
    </>
  )
}
