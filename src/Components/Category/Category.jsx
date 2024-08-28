
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'
import CardItem from '../CardItem/CardItem'
import { useLocation } from 'react-router-dom'
export default function Category() {
  const [categories,setcategories]=useState([])
  const [isLoading,setIsLoding]=useState(false)
  const location=useLocation()
  useEffect(()=>{
    CategoriesData()
    localStorage.setItem("location",location)
  },[])
  async function CategoriesData(){
    setIsLoding(true)
    await axios.get("https://ecommerce.routemisr.com/api/v1/categories").then(({data})=>{
        setcategories(data.data)
      setIsLoding(false)
     

    })
  }
  return <>
  {isLoading ?<Loading/>
    : <section className='pt-[6rem] pb-16  text-center '>
      <div className="container lg:w-4/5 m-auto   ">
        <div className="cards-container grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((categories,i)=>{
            return <CardItem key={i} img={categories.image} category={categories.name} id={categories._id} nav={"/SubCategoryProducts/"}  />
          })}
          

          
        </div>
      </div>
    </section>
  }
    </>
  
}
