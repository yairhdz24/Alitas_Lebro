import React from 'react';
import { Link } from 'react-router-dom';
import { RiRestaurantFill, RiFileList3Fill, RiUserAddFill, RiContactsBook2Fill, RiFileInfoFill, RiSettings2Fill, RiLogoutBoxFill } from "react-icons/ri";

const Sidebar = (props) => {
    const { showMenu } = props;

    return (
        <div
            className={`bg-alitas_beige fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-3 rounded-tr-xl rounded-br-xl
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
                    <li className="bg-alitas_obs_beige p-4 rounded-tl-lg rounded-bl-lg">
                        <Link to='/' className='bg-alitas_obs_red p-4 flex justify-center rounded-xl text-white'>
                            <RiRestaurantFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className="hover:bg-alitas_obs_beige p-4 rounded-tl-lg rounded-bl-lg group transition-colors">
                        <Link to='/pedidos' className='group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors'>
                            <RiFileList3Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className="hover:bg-alitas_obs_beige p-4 rounded-tl-lg rounded-bl-lg group transition-colors">
                        <Link to='/clientes' className='group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors'>
                            <RiUserAddFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className="hover:bg-alitas_obs_beige p-4 rounded-tl-lg rounded-bl-lg group transition-colors">
                        <Link to='/ruta3' className='group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors'>
                            <RiContactsBook2Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className="hover:bg-alitas_obs_beige p-4 rounded-tl-lg rounded-bl-lg group transition-colors">
                        <Link to='/ruta4' className='group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors'>
                            <RiFileInfoFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className="hover:bg-alitas_obs_beige p-4 rounded-tl-lg rounded-bl-lg group transition-colors">
                        <Link to='/ruta5' className='group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors'>
                            <RiSettings2Fill className='text-2xl' />
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul className='pl-4'>
                    <li className="hover:bg-alitas_obs_beige p-4 rounded-tl-lg rounded-bl-lg group transition-colors">
                        <Link to='/ruta6' className='group-hover:bg-alitas_obs_red p-4 flex justify-center rounded-xl text-alitas_obs_red group-hover:text-white transition-colors'>
                            <RiLogoutBoxFill className='text-2xl' />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
