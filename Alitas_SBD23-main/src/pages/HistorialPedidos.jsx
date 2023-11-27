import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from '../components/shared/Sidebar';
import { RiCloseLine, RiAddFill, RiFileList3Fill, RiMenu3Fill } from 'react-icons/ri';

const HistorialPedidos = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
      const fetchProductos = async () => {
        try {
          const response = await axios.get("http://localhost:3001/clientes");
          setProductos(response.data);
        } catch (error) {
          console.error("Error al obtener la lista de clientes", error);
        }
      };

      fetchProductos();
    }, []);
  
    const menu = () => {
      setShowMenu(!showMenu);
      setShowOrder(false);
    };

    const orders = () => {
      setShowOrder(!showOrder);
      setShowMenu(false);
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

           {/* Sección tabla de historial de pedidos */}
           <section className="container px-4 mx-auto">
              <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                      <h1 className="lg:text-3xl text-2xl text-alitas_red font-Lilita_One uppercase"> HISTORIAL DE PEDIDOS </h1>
                      <p className="lg:text-xl text-sm text-alitas_obs_red uppercase">Alitas le bro</p>
                      {/* Tabla de clientes */}
                      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
                        <thead className="bg-alitas_beige">
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">ID</th>
                                <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">ID Pedido</th>
                                <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Estado</th>
                                <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Fecha</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {clientes.map(historialpedidos => (
                            <tr key={historialpedidos.id}>
                                <td className="py-2 px-4 border-b">{historialpedidos.id_historial}</td>
                                <td className="py-2 px-4 border-b">{historialpedidos.id_pedido}</td>
                                <td className="py-2 px-4 border-b">{historialpedidos.estado}</td>
                                <td className="py-2 px-4 border-b">{historialpedidos.fecha}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  };
  
  export default HistorialPedidos;