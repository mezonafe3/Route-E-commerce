import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'
import CartItem from '../CartItem/CartItem'
import { CartData } from '../../Contexts/CartDataContext'
import NothingInCart from '../NothingInCart/NothingInCart'
import { Link, useNavigate } from 'react-router-dom'
export default function Cart() {
    const [userCart,setUserCart]=useState([])
    const [userCartTotal,setUserCartTotal]=useState(0)
    const [isLoading,setIsloading]= useState(true)
    const [cartId,setCartId]=useState('')
    const {cartData,setCartData}=useContext(CartData)
    const [noitems,setNoItems]=useState('')
    const navigate=useNavigate()
    // const {}
    useEffect(()=>{
        getCartByUser()
    },[])

    // useEffect(()=>{
    //     setNoItems("")
    // },[userCart])

    async function clearCartItems(){
        setIsloading(true)
       await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
        headers:{
            token:localStorage.getItem("token")
        }
       }).then(({data})=>{
        console.log(data);
        setUserCart([])
        setUserCartTotal(0)
        setCartData(0)
        setIsloading(false)
       })
    }


    async function getCartByUser() {
        setIsloading(true)
        await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token:localStorage.getItem("token")
              }
        }).then(({data})=>{
            setUserCart(data.data.products);
            setUserCartTotal(data.data.totalCartPrice)
            setCartData(data.numOfCartItems)
            setCartId(data.data._id)
            console.log(cartId);
            setIsloading(false)
            console.log(userCart)
        }).catch((err)=>{
            console.log(err);
            
            setUserCart([])
            setIsloading(false)
           }
           )
      
        
    }
    
    return (
        <>
           <section className='cart pt-24 pb-8'>
                <div className="container w-full md:w-[90%] md:h-screen m-auto flex flex-col md:flex-row order-1 justify-center relative gap-4">
                   
                <div className="cart-items-container w-full  md:w-[75%] lg:w-[55%]   md:min-h-screen pt-3 md:overflow-y-auto   gap-7 relative">
                           
                        {isLoading? <Loading/>:userCart.length==0?<NothingInCart/>:(userCart?.map((item,i)=>{
                                return<CartItem key={i} item={item} setcart={setUserCart} setUserCartTotal={setUserCartTotal}  />
                            }))
                        }
                        </div>
                        <div className="total-price w-2/3 m-auto md:w-[25%] md:m-0 md:mt-6 rounded-lg border-4 border-[#cccccc8a] order-2 h-fit py-5">
                              <div className="content w-4/5 m-auto flex justify-between">
                              <div className="text">
                                <p>Subtotal:</p>
                                <p>Shipping:</p>
                                <p className='mt-3 font-bold text-xl'>Total:</p>
                              </div>
                              <div className="value">
                                <p>EGP {userCartTotal}</p>
                                <p>EGP 0</p>
                                <p className='mt-3 font-bold text-xl'>EGP {userCartTotal}</p>
                              </div>
                              </div>
                              <Link onClick={()=>cartData!=0?navigate("/CheckOut/"+cartId):setNoItems("You can't Check no items in cart")}  className='block m-auto my-3 text-center bg-[#119FD9] rounded-lg w-[70%] px-1 text-white'>Check out</Link>
                              <button onClick={()=>{
                                clearCartItems()
                                
                              }
                                

                              } className='block m-auto my-3 text-center bg-red-400 rounded-lg w-[70%] px-1 text-white'>Clear Cart</button>
                              <p className='text-sm text-red-600 text-center'>{noitems}</p>
                        </div>
                </div>
           </section>
        </>
    )
}
