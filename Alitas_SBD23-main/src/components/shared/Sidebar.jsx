import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiRestaurantFill, RiFileList3Fill, RiContactsBook2Fill, RiHistoryFill } from "react-icons/ri";

const Sidebar = (props) => {
    const { showMenu } = props;
    const location = useLocation();

    // Estado local para la pestaña activa
    const [activeTab, setActiveTab] = useState('/');

    // Actualiza la pestaña activa cuando cambia la ubicación
    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location.pathname]);

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
                    <li className={`bg-${activeTab === '/' ? 'alitas_obs_red' : 'alitas_obs_beige'} p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors`}>
                    <Link to='/' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/' ? 'text-white' : 'text-alitas_obs_red'}`} onClick={() => handleSetActiveTab('/')}>
                            <RiRestaurantFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-${activeTab === '/pedidos' ? 'alitas_obs_red' : 'alitas_obs_beige'} p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors`}>
                        <Link to='/pedidos' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/pedidos' ? 'text-white' : 'text-alitas_obs_red'}`} onClick={() => handleSetActiveTab('/pedidos')}>
                            <RiFileList3Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-${activeTab === '/clientes' ? 'alitas_obs_red' : 'alitas_obs_beige'} p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors`}>
                        <Link to='/clientes' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/clientes' ? 'text-white' : 'text-alitas_obs_red'}`} onClick={() => handleSetActiveTab('/pedidos')}>
                            <RiContactsBook2Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-${activeTab === '/historialpedidos' ? 'alitas_obs_red' : 'alitas_obs_beige'} p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors`}>
                        <Link to='/historialpedidos' className={`group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/historialpedidos' ? 'text-white' : 'text-alitas_obs_red'}`} onClick={() => handleSetActiveTab('/historialpedidos')}>
                            <RiHistoryFill className='text-2xl' />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
