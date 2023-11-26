import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiRestaurantFill, RiFileList3Fill, RiUserAddFill, RiContactsBook2Fill, RiFileInfoFill, RiSettings2Fill, RiLogoutBoxFill } from "react-icons/ri";

const Sidebar = (props) => {
    const { showMenu } = props;
    const location = useLocation();

    // Estado local para la pestaña activa
    const [activeTab, setActiveTab] = useState('/');

    // Actualiza la pestaña activa cuando cambia la ubicación
    const handleSetActiveTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div
            className={`bg-alitas_beige fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-4 rounded-tr-xl rounded-br-xl
                                                                        z-50 transition-all ${showMenu ? "left-0" : "-left-full"}`}
        >
            <div>
                <ul className='pl-4'>
                    <li>
                        <img
                            src="splash1.png"
                            alt="Alitas"
                            className="h-full w-full pt-3 pl-3 pr-3"
                        />
                        <h1 className='text-xl font-Lilita_One text-alitas_red uppercase text-center'>{"alitas"} <br /> {"le bro"}</h1>
                    </li>
                    <li className={`bg-${activeTab === '/' ? 'alitas_obs_red' : 'alitas_obs_beige'} p-4 mb-2 rounded-tl-lg rounded-bl-lg`}>
                        <Link to='/' className={`p-4 flex justify-center rounded-xl text-white ${activeTab === '/' ? 'text-white' : 'text-alitas_obs_red'}`}>
                            <RiRestaurantFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`p-4 rounded-tl-lg group rounded-bl-lg mb-2 transition-colors ${activeTab === '/pedidos' ? 'bg-alitas_obs_red' : 'bg-alitas_obs_beige'}`}>
                        <Link to='/pedidos' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/pedidos' ? 'text-white' : 'text-alitas_obs_red'}`} onClick={() => handleSetActiveTab('/pedidos')}>
                            <RiFileList3Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`p-4 mb-2 group ${activeTab === '/clientes' ? 'group-hover:bg-alitas_obs_red' : 'bg-alitas_obs_beige' }`}>
                        <Link to='/clientes' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors ${activeTab === '/clientes' ? 'text-white' : 'text-alitas_obs_red'}`}>
                            <RiUserAddFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`p-4 rounded-tl-lg rounded-bl-lg mb-2 group transition-colors ${activeTab === '/ruta3' ? 'bg-green-500' : 'bg-alitas_obs_beige'}`}>
                        <Link to='/ruta3' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors ${activeTab === '/ruta3' ? 'text-white' : 'text-alitas_obs_red'}`}>
                            <RiContactsBook2Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`p-4 rounded-tl-lg rounded-bl-lg mb-2 group transition-colors ${activeTab === '/ruta4' ? 'bg-alitas_obs_red' : 'bg-alitas_obs_beige'}`}>
                        <Link to='/ruta4' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors ${activeTab === '/ruta4' ? 'text-white' : 'text-alitas_obs_red'}`}>
                            <RiFileInfoFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`p-4 rounded-tl-lg rounded-bl-lg mb-2 group transition-colors ${activeTab === '/ruta5' ? 'bg-alitas_obs_red' : 'bg-alitas_obs_beige'}`}>
                        <Link to='/ruta5' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors ${activeTab === '/ruta5' ? 'text-white' : 'text-alitas_obs_red'}`}>
                            <RiSettings2Fill className='text-2xl' />
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul className='pl-4'>
                    <li className={`p-4 rounded-tl-lg rounded-bl-lg group transition-colors ${activeTab === '/ruta6' ? 'bg-alitas_obs_red' : 'bg-alitas_obs_beige'}`}>
                        <Link to='/ruta6' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors ${activeTab === '/ruta6' ? 'text-white' : 'text-alitas_obs_red'}`} onClick={() => handleSetActiveTab('/ruta6')}>
                            <RiLogoutBoxFill className='text-2xl' />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
