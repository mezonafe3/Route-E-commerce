
import React, { useEffect, useState } from 'react'
import img from '../../assets/images/1680403397482-1.jpeg'
import axios from 'axios'
import Card from '../Card/Card'
import Loading from '../Loading/Loading'
import CardItem from '../CardItem/CardItem'
export default function Brands() {
  const [Brand,setBrands]=useState([])
  const [isLoading,setIsLoding]=useState(false)
  useEffect(()=>{
    BrandsData()
  },[])
  async function BrandsData(){
    setIsLoding(true)
    await axios.get("https://ecommerce.routemisr.com/api/v1/brands").then(({data})=>{
        setBrands(data.data)
        
      setIsLoding(false)
     

    })
  }
  return <>
  {isLoading ?<Loading/>
    :<section className='py-[6rem]  text-center'>
      <div className="container lg:w-4/5 m-auto  ">
        <div className="cards-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {Brand.map((brand,i)=>{
            return <CardItem key={i} img={brand.image} category={brand.name} nav={"/BrandProducts/"} id={brand._id} />
          })}
          

          
        </div>
      </div>
    </section>
  }
    </>
  
}
