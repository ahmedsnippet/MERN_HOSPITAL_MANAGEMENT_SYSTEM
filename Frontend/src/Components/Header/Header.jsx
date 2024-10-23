import React, { useContext, useState } from 'react'
import "./Header.css"
import { NavLink, useNavigate } from "react-router-dom"
import { IoMenu } from "react-icons/io5";
import axios from 'axios';
import { UserContext } from '../../Context/UserContext'
import { toast } from 'react-toastify'

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext)
  const [menu, setMenu] = useState(false)
  const handlelogout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/patient/logout", {
        withCredentials: true
      })
      setIsAuthenticated(false)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
      // error dikhany ky lye response pura likhna pary ga lzmii
    }
  }

  const navigateTo = useNavigate()

  const goToLogin = () => {
    navigateTo("/login")
  }
  return (
    <nav className={menu ? "navbar" : ""}>
      <div className="logo">
        <img src="./logo.png" alt="logo" />
      </div>
      <ul className='navbar-list'>
        <li onClick={() => { setMenu(!menu) }}><NavLink to={"/"} >Home</NavLink></li>
        <li onClick={() => { setMenu(!menu) }}><NavLink to={"/appointment"}>Appoinnment</NavLink></li>
        <li onClick={() => { setMenu(!menu) }}><NavLink to={"/about"}>About</NavLink></li>
        {isAuthenticated ? (<button className='logoutBtn' onClick={() => { handlelogout(); setMenu(!menu); }}>Logout</button>) : (<button className='loginBtn' onClick={() => { goToLogin(); setMenu(!menu); }}>Login</button>)}
      </ul>

      <div className="hamburger" onClick={() => { setMenu(!menu) }}>
        <IoMenu />
      </div>
    </nav>
  )
}

export default Header