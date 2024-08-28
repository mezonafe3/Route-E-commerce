import { useContext } from "react"
import { AuthContext } from "../../Contexts/AuthContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children}) {
    const{userToken}=useContext(AuthContext)
    return (
        <>
         {localStorage.getItem("token")==null?<Navigate to="/Login"/>:children}
        </>
    )
}
