import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from "../../Context/UserContext"
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./Login.css"
const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigateTo = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/login", { email, password, role: "Patient" }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success(response.data.message)
            setIsAuthenticated(true)
            setEmail("")
            setPassword("")
            navigateTo("/")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    if (isAuthenticated) {
        return navigateTo("/")
    }
    return (
        <>
            <div className="container form-component login-form">
                <h2>Login To Get Access</h2>
                <form onSubmit={handleSubmit}>

                    <input type="text" placeholder='Enter Your Email' value={email} onChange={(e) => { setEmail(e.target.value) }} /><br /><br />
                    <input type="password" placeholder='Enter Your Password' value={password} onChange={(e) => { setPassword(e.target.value) }} /><br /><br />


                    <div
                        style={{
                            gap: "10px",
                            justifyContent: "flex-end",
                            flexDirection: "row",
                        }}
                    >
                        <p style={{ marginBottom: 0 }}>Not Registered?</p>
                        <Link
                            to={"/signUp"}
                            style={{ textDecoration: "none", color: "#271776ca" }}
                        >
                            Register Now
                        </Link>
                    </div>
                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login