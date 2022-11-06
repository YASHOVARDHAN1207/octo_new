import React from 'react'
import Navbar from './Navbar'

const LandingPage = ({setLogin}) => {
  return (
    <div className='flex'>
        {/* Navbar */}
        <Navbar setLogin={setLogin} />
        {/* Hero Component */}
        {/* About Us */}
        {/* Subscriptions */}
    </div>
  )
}

export default LandingPage