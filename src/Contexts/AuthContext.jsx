import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export  const AuthContext=createContext()

function AuthContextProvider({children}){
    const [userToken,setUserToken]=useState("")
    useEffect(()=>{
        if(localStorage.getItem("token") != null){
            setUserToken(localStorage.getItem("token"))
        }
    },[])
    // useEffect(()=>{
    //     let isLoggedIn=localStorage.getItem("token") 
    //     let userinAuth=["/Login","/Register"].includes(location.pathname)
    //     if(isLoggedIn){
    //         setUserToken(isLoggedIn)
    //         if(userinAuth){
    //             navigate("/")
    //         }else{
    //             navigate(location.pathname)
    //         }
           
    //     }
    // },[])
     
    return <AuthContext.Provider value={{userToken,setUserToken}} >
        {children}
    </AuthContext.Provider>
}
export default AuthContextProvider