import axios from 'axios'
import React, { useContext, useState } from 'react'
import { CartData } from '../../Contexts/CartDataContext'

export default function CartItem({item ,setcart,setUserCartTotal}) {
    const [OnDeleteLoading,setOnDeleteloading]= useState(false)
    const [CounterLoading,setCounterLoading]= useState(false)
    const {setCartData}=useContext(CartData)
    
    async function updateProductCount(id,count){
        setCounterLoading(true)
        let {data}=await axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+id,{
            count
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setcart(data.data.products)
        setUserCartTotal(data.data.totalCartPrice)
        setCartData(data.numOfCartItems)
        setCounterLoading(false)
    }
    async function removeCartProduct(id){
        setOnDeleteloading(true)
       let {data}= await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/"+id,{
            headers:{
                token:localStorage.getItem("token")
              }
        })
        
        setcart(data.data.products)
        setUserCartTotal(data.data.totalCartPrice)
        setCartData(data.numOfCartItems)
        setOnDeleteloading(false)
        
      
    }

  return (
    <div  className="cart-item shadow-xl w-full lg:w-[80%] m-auto  flex relative rounded-xl gap-2 mt-3">
                                <div className="delete absolute right-3 top-3">
                                    <button onClick={()=>{
                                        removeCartProduct(item.product._id)
                                    }}>
                                    {!OnDeleteLoading?<i className="fa-solid fa-trash"></i>:<i className="fa-solid fa-gear fa-spin"></i>}
                                    </button>
                                </div>
                                   <div className="img w-[25%] p-3">
                                         <img src={item.product.imageCover} alt="" className=' w-full rounded-lg'/>
                                   </div>
                                   <div className="product-info rounded-xl py-3 bg-[#11a0d917] flex flex-col flex-grow gap-6 pr-2 ps-2">
                                    <div className="info w-[90%]">
                                        <h1 className='text-sm md:text-[25px] font-bold line-clamp-1'>{item.product.title}</h1>
                                    </div>
    
                                    <div className="qty-price flex  justify-between items-center pt-2">
                                        <div className="qty flex order-2  items-center ">
                                            <button disabled={item.count==1} onClick={()=>updateProductCount(item.product._id,item.count-1)} className='bg-[#119FD9] disabled:bg-slate-500 text-sm px-2 md:px-2 rounded-s-md text-white'>-</button>
                                            {!CounterLoading?<input type="text" className='w-6 text-center'  value={item.count} min='1' />:<i class="fa-solid fa-spinner fa-spin px-1"></i>}
                                            <button onClick={()=>updateProductCount(item.product._id,item.count+1)} className='bg-[#119FD9] text-sm px-2 md:px-2 rounded-e-md text-white'>+</button>
                                        </div>
                                        <div className="price">
                                            <p className='text-sm mb-2'><span className='font-semibold'>{ item.price * item.count}</span> Egp</p>
                                        </div>
                                    </div>
                                   </div>
                                </div>
  )
}
