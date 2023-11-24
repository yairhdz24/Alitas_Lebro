import { useState } from 'react'

function Header() {

  return (
    <>
      <div className='bg-alitas_beige min-h-screen'>
        <div className="flex items-center">
          <img
            src="src\assets\alitas1.png" 
            alt="Alitas"
            className="h-60 w-full mr-0"
          />
          <img
            src="src\assets\alitas2.png" 
            alt="Alitas"
            className="h-60 w-full"
          />
        </div>

      <h1 className="text-5xl font-Bungee text-alitas_red" >ALITAS LE BRO</h1>
      {/* Botones */}
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">
          Botón 1
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Botón 2
        </button>
      </div>
    </div>
    </>
  )
}

export default Header