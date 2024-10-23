import React from 'react'
import './HeroSection.css'

const HeroSection = ({title,imageUrl}) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>Ahmed Medical Center is a state-of-the-art facility dedicated
          to providing comprehensive healthcare services with compassion and
          expertise. Our team of skilled professionals is committed to
          delivering personalized care tailored to each patient's needs.
          we prioritize your well-being, ensuring a harmonious
          journey towards optimal health and wellness.</p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="logo" />
      </div>
    </div>
  )
}

export default HeroSection