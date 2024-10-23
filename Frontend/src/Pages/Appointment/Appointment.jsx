import React from 'react'
import AppointmentForm from '../../Components/AppointmentForm/AppointmentForm'
import HeroSection from '../../Components/HeroSection/HeroSection'

const Appointment = () => {
  return (
    <>
      <HeroSection title={"Schedule Your Appointment | Ahmed Medical Center"}
        imageUrl={"/signin.png"} />
      <AppointmentForm />
    </>
  )
}

export default Appointment