import React, { useState } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import "./Message.css"

const Message = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/api/v1/message/sendMessage", { firstName, lastName, email, phone, message }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success(response.data.message)
      setFirstName("")
      setLastName("")
      setEmail("")
      setPhone("")
      setMessage("")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (

    <div className="container form-component message-form">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />


        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />


        <textarea
          rows="8"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Send</button>
        </div>
      </form>

    </div>
  )
}

export default Message