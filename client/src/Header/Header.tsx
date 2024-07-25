import React from 'react'
import Navbar from './Navbar'

function Header() {
  return (
    <div className='flex items-center justify-between bg-gray-900 p-4 shadow-md'>
      <h1 className='m-1 p-1  font-bold text-3xl text-white'>Codify</h1>
      <Navbar />
      <h1 className='text-xl font-bold text-white'>LOGIN</h1>

    </div>
  )
}

export default Header