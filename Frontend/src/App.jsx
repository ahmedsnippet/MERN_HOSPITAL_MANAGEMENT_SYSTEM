import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Header from "./Components/Header/Header"
import Footer from './Components/Footer/Footer'
import Appointment from './Pages/Appointment/Appointment'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import About from './Pages/About/About'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './Context/UserContext'
import axios from 'axios'

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(UserContext)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/user/patient/me", {
          withCredentials: true
        })
        setIsAuthenticated(true)
        setUser(response.data.user)
      } catch (error) {
        setIsAuthenticated(false)
        setUser({})
      }
    }
    fetchUser()
  }, [isAuthenticated])

  return (

    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
      <ToastContainer position='top-center' />
    </Router>
  )
}

export default App