import React from 'react'
import HeroSection from '../Components/HeroSection/HeroSection'
import Biography from '../Components/Biography/Biography'
import Departments from '../Components/Departments/Departments'
import Message from '../Components/Message/Message'

const Home = () => {
    return (
        <>
            <HeroSection title={"Welcome to Ahmed Medical Center | Your Trusted Healthcare Provider ! "} imageUrl={"/hero.png"} />
            <Biography imageUrl={"/about.png"}/>
            <Departments />
            <Message />
        </>
    )
}

export default Home