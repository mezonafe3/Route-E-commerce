import React from "react";
import { Link } from "react-router-dom";

export default function CardItem({img ,category,id,nav}) {
  return (
    <>
    
      <div  className=" categ-card rounded-md shadow-2xl w-[100%] bg-black relative group overflow-hidden transition-all ">
      <Link to={nav+id}>
        <div div className="img h-40 relative">
          <img src={img} alt="" className="w-full  object-cover object-center " />
          <div className="overlay absolute top-0 left-0 bottom-0 bg-[#11a0d988] right-full group-hover:right-0 transition-all duration-700">
            <h2 className="absolute font-bold text-transparent group-hover:text-white text-2xl text-start bottom-1/2 ps-4 transition-all duration-700">
              {category}
            </h2>
          </div>
        
        </div>
        </Link>
      </div>
   
     
    </>
  );
}
