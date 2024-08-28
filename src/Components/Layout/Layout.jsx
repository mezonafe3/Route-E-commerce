
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ScrollTop from '@/Services/ScrollTop'

export default function Layout() {
  return (
    <>
   
    <Navbar/>
      <ScrollTop/>
          <Outlet />
      <Footer/>
      
    </>
    
  )
}
