import React, { useContext } from 'react'
import cart from '../../assets/images/cart.png'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'

export default function Footer() {

  const{userToken}=useContext(AuthContext)
  return (
    <>
      <footer className='pt-16 pb-10 shadow-footer  '>
        <div className="container lg:w-4/5 m-auto flex justify-between items-center flex-wrap gap-3 md:gap-0">
        <div className="info xl:w-1/5 md:w-1/3 flex flex-col justify-center items-center">
          <div className="logo">
            <div className="img  flex">
              <h2 className='text-4xl font-sans font-bold'>Fresh<br />Cart</h2>
              <img src={cart} alt="" className='w-16' />
            </div>
          </div>
          <div className='social-list mt-6'>
              <ul className=' flex justify-center'>
                <li className='mr-2 hover:bg-white hover:text-[#119FD9] transition-all duration-500 cursor-pointer p-2 rounded-full size-7 flex justify-center items-center text-white bg-[#119FD9]'><i class="fa-brands fa-facebook"></i></li>
                <li className='mr-2 hover:bg-white hover:text-[#119FD9] transition-all duration-500 cursor-pointer p-2 rounded-full size-7 flex justify-center items-center text-white bg-[#119FD9]'><i class="fa-brands fa-instagram"></i></li>
                <li className='mr-2 hover:bg-white hover:text-[#119FD9] transition-all duration-500 cursor-pointer p-2 rounded-full size-7 flex justify-center items-center text-white bg-[#119FD9]'><i class="fa-brands fa-twitter"></i></li>
                <li className='mr-2 hover:bg-white hover:text-[#119FD9] transition-all duration-500 cursor-pointer p-2 rounded-full size-7 flex justify-center items-center text-white bg-[#119FD9]'><i class="fa-brands fa-linkedin"></i></li>
              </ul>
          </div>  
        </div>

        <div className="about-group flex flex-col md:flex-row justify-between xl:w-1/2 md:w-2/3 sm:w-full gap-2 md:gap-0">
        {userToken && <>

        <div className="about-1 border-s-2 border-gray-20 ps-1 ">
          <h2 className=' md:text-xl font-bold'>Pages</h2>
          <div className="pages-links">
            <NavLink to={"/"} className=" pr-3 font-sans block ms-2">Products</NavLink>
            <NavLink to={"/Categories"} className=" pr-3 font-sans block ms-2">Categories</NavLink>
            <NavLink to={"/Brands"} className=" pr-3 font-sans block ms-2">Brands</NavLink>
            <NavLink to={"/Cart"} className=" pr-3 font-sans block ms-2">Cart</NavLink>
          </div>
        </div>

        </>}
        
        	


        <div className="about-1  border-s-2 border-gray-20 ps-1 ">
          <h2 className='text-xl font-bold'>Shop with Us</h2>
          <div className="pages-links">
            <NavLink className="pr-3 font-sans block ms-2">Your Account
            </NavLink>
            <NavLink className="pr-3 font-sans block ms-2">Products</NavLink>
            <NavLink className="pr-3 font-sans block ms-2">Your Orders
            </NavLink>
            <NavLink className="pr-3 font-sans block ms-2">Your Addresses
            </NavLink>
        </div>
        </div>

        	
        <div className="about-1  border-s-2 border-gray-20 ps-1 ">
          <h2 className='text-xl font-bold'>Let Us Help You
          </h2>
          <div className="pages-links">
            <NavLink className="pr-3 font-sans block ms-2">Help
            </NavLink>
            <NavLink className="pr-3 font-sans block ms-2">Shipping & Delivery
            </NavLink>
            <NavLink className="pr-3 font-sans block ms-2">Returns & Replacements
            </NavLink>
            <NavLink className="pr-3 font-sans block ms-2">Amazon App Download
            </NavLink>
          </div>
        </div>
        </div>
        </div>
       
       </footer>
       <div className="copy-right text-center">
           <p className='font-semibold font-sans text-sm'>© 2024 Mazen Ahmed All Rights Reserved</p>
        </div>
    </>
  )
}
