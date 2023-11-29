import React from "react";
import { RiSearchLine } from "react-icons/ri";

const Header = () => {
  return (
    <header>
    {/* "Alitas le bro" and search */}
    <div className="flex flex-col md:flex-row md:justify-between md:items_center gap-4 mb-6">
      <div>
        <h1 className="lg:text-3xl text-2xl text-alitas_red font-Lilita_One uppercase"> Alitas Le Bro </h1>
        <p className="lg:text-xl text-sm text-alitas_obs_red uppercase">Las mejores alitas de tonalejos</p>
      </div>
      <form>
        <div className="w-full relative">
          < RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-alitas_obs_red"/>
          <input
          type="text"
          className="bg-alitas_beige w-full py-2 pl-8 pr-4 rounded-lg text-black outline-none"
          placeholder="Buscar producto"
          />
        </div>
      </form>
    </div>
    {/* Tabs */}
    <nav className="text-alitas_beige flex items-center justify-between md:justify-start md:gap-12 border-b border-alitas_beige mb-6">
      <a href="#" 
        className="relative text-xl py-2 before:w-1/2 before:h-[2px] before:absolute before:bg-alitas_red before:left-0
        before:rounded-full before:-bottom-[1px] text-alitas_red"
      >
        Alitas
      </a>
      <a href="#" className="py-2">
      Snacks
      </a>
      <a href="#" className="py-2">
        Bebidas
      </a>
    </nav>
  </header>
  );
};

export default Header;