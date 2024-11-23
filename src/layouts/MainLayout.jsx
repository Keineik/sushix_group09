import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import NavbarDown from "../components/NavbarDown"

const MainLayout = () => {
  return (
    <div>
        <Navbar />
        <NavbarDown />
        <Outlet />
    </div>
  )
}

export default MainLayout