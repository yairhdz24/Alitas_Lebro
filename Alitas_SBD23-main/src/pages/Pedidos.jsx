import React, { useState, useEffect } from 'react';
import Sidebar from '../components/shared/Sidebar';
import { RiCloseLine, RiAddFill, RiFileList3Fill, RiDeleteBin6Fill, RiPencilFill, RiMenu3Fill } from 'react-icons/ri';

const Pedidos = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedidoId, setSelectedPedidoId] = useState(null);
  const [selectedPedidoEstado, setSelectedPedidoEstado] = useState('');

  const handleEditarPedido = (id) => {
    console.log("Pedido ID seleccionado:", id);
    setSelectedPedidoId(id);
    setShowMenu(true);
  };

  const handleModificarPedido = async () => {
    try {
      console.log('Pedido ID seleccionado:', selectedPedidoId);
      console.log('Nuevo Estado:', selectedPedidoEstado);

      const response = await fetch(`http://localhost:3001/pedidos/${selectedPedidoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nuevoEstado: selectedPedidoEstado }),
      });

      if (response.ok) {
        console.log('Pedido modificado exitosamente');
        // Actualizar el estado local
        const nuevosPedidos = [...pedidos]; // Copiar el estado actual
        const pedidoModificadoIndex = nuevosPedidos.findIndex(pedido => pedido.id_pedido === selectedPedidoId);
        nuevosPedidos[pedidoModificadoIndex].estado = selectedPedidoEstado;
        setPedidos(nuevosPedidos); // Actualizar el estado local
      } else {
        console.error('Error al modificar el pedido:', response.statusText);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }

    setShowMenu(false);
  };

  useEffect(() => {
    // Obtener pedidos desde el backend al cargar el componente
    fetch('http://localhost:3001/pedidos')
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error('Error al obtener pedidos:', error));
  }, []);

  const handleEliminarPedido = (id) => {
    // Eliminar pedido desde el backend
    fetch(`http://localhost:3001/pedidos/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status === 200) {
          // Actualizar la lista de pedidos después de la eliminación
          setPedidos(pedidos.filter((pedido) => pedido.id_pedido !== id));
        } else {
          console.error('Error al eliminar pedido:', response.statusText);
        }
      })
      .catch((error) => console.error('Error al eliminar pedido:', error));
  };

  return (
    <div className="bg-alitas_obs_beige w-full min-h-screen">
      {/* Sidebar y Navbar */}
      <Sidebar showMenu={showMenu} />
      <nav className="bg-alitas_beige lg:hidden fixed w-full bottom-0 left-0 text-3xl text-alitas_obs_red p-4 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <button className="p-2">
          <RiCloseLine />
        </button>
        <button className="p-2">
          <RiAddFill />
        </button>
        <button onClick={() => setShowMenu(!showMenu)} className="p-2">
          <RiFileList3Fill />
        </button>
        <button onClick={() => setShowMenu(!showMenu)} className="p-2">
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </nav>

      {/* Main */}
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
         
          {/* Tabla de pedidos */}
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">ID Pedido</th>
                          <th className="px-4 py-2 text-left">Fecha</th>
                          <th className="px-4 py-2 text-left">Estado</th>
                          <th className="px-4 py-2 text-left">Cliente</th>
                          <th className="px-4 py-2 text-left">Compra</th>
                          <th className="px-4 py-2 text-left">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Filas de la tabla */}
                        {pedidos.map((pedido) => (
                          <tr key={pedido.id_pedido}>
                            <td className="px-4 py-4 whitespace-nowrap">#00{pedido.id_pedido}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{pedido.fecha}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full ${pedido.estado === 'Entregado' ? 'bg-green-100/60' : (pedido.estado === 'Pendiente' ? 'bg-orange-100/60' : 'bg-red-100/60')}`}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={`bg-${pedido.estado === 'Entregado' ? 'green' : (pedido.estado === 'Pendiente' ? 'orange' : 'red')}-500`} />
                                </svg>
                                <span className={`ml-2 text-${pedido.estado === 'Entregado' ? 'green' : (pedido.estado === 'Pendiente' ? 'orange' : 'red')}-500`}>{pedido.estado}</span>
                              </div>
                              {showMenu && pedido.id_pedido === selectedPedidoId && (
                                <div className="relative inline-block">
                                  <button
                                    onClick={() => setSelectedPedidoId(null)}
                                    className="absolute inset-0 w-full h-full bg-transparent cursor-default"
                                  ></button>
                                  <div className="absolute -right-96 z-20 w-38 py-2 mt-2 origin-top-right bg-gray-200 rounded-md shadow-xl ">
                                    <button
                                      onClick={() => {
                                        setSelectedPedidoEstado('Entregado');
                                        handleModificarPedido();
                                      }}
                                      className="block px-4 py-3 text-sm text-gray-900 capitalize transition-colors duration-300 transform hover:bg-gray-100 "
                                    >
                                      Entregado
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSelectedPedidoEstado('Cancelado');
                                        handleModificarPedido();
                                      }}
                                      className="block px-4 py-3 text-sm text-gray-900 capitalize transition-colors duration-300 transform hover:bg-gray-100 "
                                    >
                                      Cancelado
                                    </button>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">{pedido.cliente}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{pedido.compra}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <button onClick={() => handleEditarPedido(pedido.id_pedido)} className="text-alitas_blue hover:underline">
                                <RiPencilFill />
                              </button>
                              <button onClick={() => handleEliminarPedido(pedido.id_pedido)} className="text-red-500 hover:underline ml-2">
                                <RiDeleteBin6Fill />
                              </button>
                            </td>
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

export default Pedidos;
