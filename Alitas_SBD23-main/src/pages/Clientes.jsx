import React, { useState, useEffect } from 'react';
import Sidebar from '../components/shared/Sidebar';
import { RiCloseLine, RiAddFill, RiFileList3Fill, RiMenu3Fill } from 'react-icons/ri';

const Clientes = () => {
    const [showMenu, setShowMenu] = useState(false);

    const menu = () => {
      setShowMenu(!showMenu);
      // Otras lógicas necesarias al hacer clic en el botón del menu
    };
  
    return (
      <div className="bg-alitas_obs_beige w-full min-h-screen">
        <Sidebar showMenu={showMenu} />
        {/* NAV de mobil */}
        <nav className="bg-alitas_beige lg:hidden fixed w-full bottom-0 left-0 text-3xl text-alitas_obs_red p-4 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
          <button className="p-2">
            <RiCloseLine />
          </button>
          <button className="p-2">
            <RiAddFill />
          </button>
          <button onClick={menu} className="p-2">
            <RiFileList3Fill />
          </button>
          <button onClick={menu} className="p-2">
            {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
          </button>
        </nav>
        {/* Main */}
        <main className="lg:pl-32 lg:pr-96 pb-20">
          <div className="md:p-8 p-4">
            <h1>CREA UNA TABLA DE CLIENTES </h1>
            {/* Contenido adicional del componente de pedidos */}
          </div>
        </main>
      </div>
    );
  };
  
  export default Clientes;