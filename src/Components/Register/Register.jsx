
import { useFormik } from 'formik'
import cart from '../../assets/images/cart.png'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    let[isLoading,setIsLoading]=useState(false)
    let[errorMsg,setErrorMsg]=useState("")
    let[succMsg,setSuccMsg]=useState("")
    const navigate=useNavigate()
    let {handleSubmit,values,handleChange,errors,touched,handleBlur} =useFormik({
        initialValues:{
            "name":'',
            "email":'',
            "password":'',
            "rePassword":'',
            "phone":''
       
        },
        validationSchema:yup.object({
            name :yup.string().required("Name is required").min(3,"Name must be at least 3 letters").max(20,"Name must be less than 20 letters"),
            email :yup.string().required("Email is required ").email("Enter valid email"),
            password :yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Minimum eight characters, at least one letter, one number and one special character"),
            rePassword: yup.string().required("Repassword is required").oneOf([yup.ref("password")],"Doesn't match"),
            phone :yup.string().required("Phone number is required")

        }),
        onSubmit:register
    })
    async function register(){
            setIsLoading(true)
            setErrorMsg("")
            setSuccMsg("")

            await axios .post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then(({data})=>{
                setIsLoading(false)
                setSuccMsg(data.message)
                navigate("/Login")
            }).catch((err)=>{
                setIsLoading(false)
                setErrorMsg(err.response.data.message)
            })

    }
    return (
    <>
    
        <section id="register" className="h-screen bg-[#11a0d988] flex justify-center items-center">
            
            <div className="form bg-white w-11/12 md:w-4/6 lg:w-1/3 p-6 rounded-lg ">
                <div className="content  text-center flex  gap-2 justify-center items-center">
                    <img src={cart} alt="" className='w-6' />
                    <h1 className="text-lg lg:text-xl font-bold ">Welcome To Fresh Cart</h1>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="field my-3">
                    <label className="ml-3" htmlFor="">Name</label><br />
                    <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" name='name' className="w-full rounded-2xl py-1 mt-1 border-gray-300 border-2 px-3" />
                    {touched.name&&errors.name&&<p className='text-red-400 text-sm'>{errors.name}</p>}
                </div>
                <div className="field my-3">
                    <label className="ml-3" htmlFor="">Email</label><br />
                    <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="text" name='email' className="w-full rounded-2xl py-1 mt-1 border-gray-300 border-2 px-3 bg" />
                    {touched.email&&errors.email&&<p className='text-red-400 text-sm'>{errors.email}</p>}
                </div>
                <div className="field my-3">
                    <label className="ml-3" htmlFor="">Phone</label><br />
                    <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="text" name='phone' className="w-full rounded-2xl py-1 mt-1 border-gray-300 border-2 px-3" />
                    {touched.phone&&errors.phone&&<p className='text-red-400 text-sm'>{errors.phone}</p>}
                </div>
                <div className="field my-3">
                    <label className="ml-3" htmlFor="">Password</label><br />
                    <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="text" name='password' className="w-full rounded-2xl py-1 mt-1 border-gray-300 border-2 px-3" />
                    {touched.password&&errors.password&&<p className='text-red-400 text-sm'>{errors.password}</p>}
                </div>
                <div className="field my-3">
                    <label className="ml-3" htmlFor="">Repassword</label><br />
                    <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="text" name='rePassword' className="w-full rounded-2xl py-1 mt-1 border-gray-300 border-2 px-3" />
                    {touched.rePassword&&errors.rePassword&&<p className='text-red-400 text-sm'>{errors.rePassword}</p>}
                </div>
                <div className="btn w-4/5 m-auto text-center">
                    <button  type='submit' className=" bg-[#119fd9] hover:bg-[#11a0d9b3] w-full p-1 rounded-sm text-white font-bold mb-2 disabled:bg-gray-500" disabled={isLoading} >Sign-up {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>} </button>
                    {errorMsg && <p className='text-red-500'>{errorMsg}</p>} 
                    {succMsg && <p className='text-green-500'>{succMsg}</p>} 
                    <div className="links flex justify-center gap-1 text-sm md:text-lg ">
                        <p>Already have an account </p>
                        <Link to={"/Login"} className='text-[#119fd9] underline hover:no-underline'> Sign-in</Link>
                        
                    </div>
                    
                </div>
                </form>
            </div>
        </section>
    
    </>
    )
}
