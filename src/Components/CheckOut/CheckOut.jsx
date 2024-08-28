
import { useFormik } from 'formik'
import cart from '../../assets/images/cart.png'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

export default function CheckOut() {
    const {id}=useParams()
    
    let[isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    let {handleSubmit,values,handleChange,errors,touched,handleBlur} =useFormik({
        initialValues:{
            "details": "details",
            "phone": "01010700999",
            "city": "Cairo"
        },
        validationSchema:yup.object({
            details :yup.string().required("details is required "),
            city :yup.string().required("city is required"),
            phone:yup.string().required("phone is required ")
        }),
        onSubmit:checkOut
    })
    async function checkOut(){
            setIsLoading(true)
            await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+id,{shippingAddress:values},{
                headers:{
                    token:localStorage.getItem("token")
                },
                params:{
                    url:"http://localhost:5173"
                }
            }).then(({data})=>{
                console.log(data.session.url);
                setIsLoading(false)
                location.href= data.session.url
                }).catch((err)=>{
                setIsLoading(false)
                console.log(err);
            })

    }
    return (
    <>
    
        <section id="register" className="h-screen bg-[#11a0d988] flex justify-center items-center">
            
            <div className="form bg-white w-11/12 md:w-4/6 lg:w-1/3 p-6 rounded-lg ">
                <div className="content  text-center flex  gap-2 justify-center items-center">
                    <img src={cart} alt="" className='w-6' />
                    <h1 className="text-lg lg:text-xl font-bold ">Shipping Info</h1>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="field my-3">
                    <label className="ml-3" htmlFor="details">Details</label><br />
                    <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" name='details' className="w-full rounded-2xl py-1 mt-1 border-gray-300 border-2 px-3 bg" />
                    {touched.details&&errors.details&&<p className='text-red-400 text-sm'>{errors.details}</p>}
                </div>
               
                <div className="field my-3">
                    <label className="ml-3" htmlFor="city">city</label><br />
                    <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" name='city' className="w-full rounded-2xl py-1 mt-1 border-gray-300 border-2 px-3" />
                    {touched.city&&errors.city&&<p className='text-red-400 text-sm'>{errors.city}</p>}
                </div>
                <div className="field my-3">
                    <label className="ml-3" htmlFor="phone">phone</label><br />
                    <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" name='phone' className="w-full rounded-2xl py-1 mt-1 border-gray-300 border-2 px-3" />
                    {touched.phone&&errors.phone&&<p className='text-red-400 text-sm'>{errors.phone}</p>}
                </div>
                <div className="btn w-4/5 m-auto text-center">
                    <button  type='submit' className=" bg-[#119fd9] hover:bg-[#11a0d9b3] w-full p-1 rounded-sm text-white font-bold mb-2 disabled:bg-gray-500" disabled={isLoading} >Check out {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>} </button>

                </div>
                </form>
            </div>
        </section>
    
    </>
    )
}
