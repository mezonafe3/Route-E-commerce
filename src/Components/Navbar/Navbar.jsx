import { Link, NavLink, useNavigate } from 'react-router-dom'
import cart from '../../assets/images/cart.png'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { CartData } from '../../Contexts/CartDataContext'
import { motion } from "framer-motion"
import { WishListData } from '@/Contexts/WishListData'
export default function Navbar() {
    const [dropMenu,setDropMenu]=useState(false)
    const {userToken,setUserToken} =useContext(AuthContext)
    const{cartData}=useContext(CartData)
    const {wishListCount} = useContext(WishListData);

    // useEffect(()=>{
    //     gatcartNumData()
    // },[])
    const navigate=useNavigate()
    function logOut(){
        setUserToken("")
        localStorage.removeItem("token")
        navigate("/Login")
    }
    function Toggle(){
        if(dropMenu){
            setDropMenu(false)
        }else{
            setDropMenu(true)
        }
    }
    // async function gatcartNumData(){
    //     const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
    //     },{
    //         headers:{
    //         token:localStorage.getItem("token")
    //       }
    //     })
    //     console.log(data);
    //   }
    return (
    <>
        <nav className='py-3 fixed z-[999999] top-0 right-0 left-0 bg-white shadow-lg '>
            <div className="container w-4/5 m-auto flex justify-between items-center  flex-wrap">
            <div className="logo  flex justify-center items-center gap-1">
            <Link to="/" className='flex gap-1'>
                <div className="img w-9">
                    <img src={cart} alt="" className='w-full rotate' /> 
                </div>
                
             <h1 className='font-bold font-sans text-2xl'>FreshCart</h1></Link>  
                
            </div>
            
            <div className="links flex  items-center ">
                
                {userToken &&
                    <div >
                        <ul className="nav-links hidden lg:flex items-center">

                        <li className='mr-2 '><NavLink to="/" className="px-1 inline-block  font-sans">Products</NavLink></li>
                         <li className='mr-2 '><NavLink to={"Categories"} className="px-1  font-sans">Categories</NavLink></li>
                         <li className='mr-2 '><NavLink to={"Brands"} className="px-1 font-sans">Brands</NavLink></li>
                         <li className='mr-2 '><div className="cart relative "> 
                            <NavLink to={"Cart"} className="px-1  font-sans">Cart</NavLink>
                            <div className="popup p-1 px-2 rounded-full rounded-es-none flex justify-center items-center bg-[#119FD9] absolute -top-3 -right-2">
                                <p className='text-[10px] text-white font-bold'>{cartData}</p>
                            </div>
                        </div>
                   </li>
                   <li className='mr-2 '><div className="cart relative mr-3"> 
                            <NavLink to={"WishList"} className="px-1  font-sans">Wishlist</NavLink>
                            <div className="popup p-1 px-2 rounded-full rounded-es-none flex justify-center items-center bg-[#119FD9] absolute -top-3 -right-2">
                                <p className='text-[10px] text-white font-bold'>{wishListCount}</p>
                            </div>
                        </div>
                   </li>
                        </ul>
                        </div>
                }
                
                <div className="buttons">
                    {!userToken && <button className='py-1 hidden lg:inline-block px-6 bg-[#119FD9] rounded-md mr-2 text-white'onClick={()=>{navigate("/Login")}}>Login</button>}
                    {!userToken && <button className='py-1 hidden lg:inline-block px-6 bg-[#41cb76] rounded-md mr-2 text-white'onClick={()=>{navigate("/Register")}}>Register</button>}

                   { userToken &&<button className='hidden lg:inline-block py-1 px-6 bg-[#dd6883] rounded-md text-white' onClick={logOut}>Logout</button>}
                    <i class="fa-solid fa-bars fa-2xl cursor-pointer lg:hidden" onClick={Toggle} ></i>
                </div>
                
            </div>
            
           
            </div> 
            
        </nav>
        { 
           <motion.div animate={{top:dropMenu?61:-350}} className='fixed  z-10 w-full bg-white lg:hidden'>

           
           <div className="nav-links-mobile bg-slate-100 rounded-md  mt-3  w-[80%] flex flex-col m-auto transition-all duration-500 ease-out p-2">

          {userToken && <div className="links flex flex-col py-3  rounded-md">
               <NavLink to={"/"} className="ps-3  my-1 font-sans font-semibold py-2 font-sans" onClick={()=>{Toggle()}}>Products</NavLink>
               <NavLink to={"Categories"} className="ps-3  my-1 font-sans font-semibold py-2 font-sans" onClick={()=>{Toggle()}}>Categories</NavLink>
               <NavLink to={"WishList"} className="ps-3  my-1 font-sans font-semibold py-2 font-sans" onClick={()=>{Toggle()}}>Wishlist</NavLink>

               <NavLink to={"Brands"} className="ps-3   my-1 font-sans font-semibold py-2 font-sans" onClick={()=>{Toggle()}}>Brands</NavLink>
               <NavLink to={"Cart"} className="ps-3   my-1 font-sans font-semibold py-2  font-sans" onClick={()=>{Toggle()}}>Cart</NavLink>
           </div>}
               {userToken &&<button className='py-1 mt-2 px-6 bg-[#dd6883] rounded-md text-white' onClick={()=>{logOut()
                   Toggle()
               }}>Logout</button>}
               {!userToken && <button className='py-1 mt-2 px-6 bg-[#119FD9] rounded-md mr-2 text-white'onClick={()=>{navigate("/Login")
                    Toggle()
               }}>Login</button>}
               {!userToken && <button className='py-1 mt-2 px-6 bg-[#41cb76] rounded-md mr-2 text-white'onClick={()=>{navigate("/Register") 
               Toggle()} }>Register</button>}
           </div>
           </motion.div>
       }
    </>
    )
}

