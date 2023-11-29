import React, { useState, useEffect } from 'react';
import Sidebar from '../components/shared/Sidebar';
import {
  RiCloseLine,
  RiAddFill,
  RiFileList3Fill,
  RiDeleteBin6Fill,
  RiPencilFill,
  RiMenu3Fill,
} from 'react-icons/ri';

const Pedidos = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedidoId, setSelectedPedidoId] = useState(null);
  const [selectedPedidoEstado, setSelectedPedidoEstado] = useState('');

  const handleEditarPedido = (id) => {
    console.log('Pedido ID seleccionado:', id);
    setSelectedPedidoId(id);
    setShowMenu(true);
  };

  const handleModificarPedido = async (estado) => {
    try {
      if (!selectedPedidoId) {
        console.error('No se ha seleccionado un pedido para editar.');
        return;
      }

      console.log('Pedido ID seleccionado:', selectedPedidoId);
      console.log('Nuevo Estado:', estado);

      const response = await fetch(`http://localhost:3001/pedidos/${selectedPedidoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nuevoEstado: estado }),
      });

      if (response.ok) {
        console.log('Pedido modificado exitosamente');
        // Actualizar el estado local
        const nuevosPedidos = [...pedidos];
        const pedidoModificadoIndex = nuevosPedidos.findIndex((pedido) => pedido.id_pedido === selectedPedidoId);
        nuevosPedidos[pedidoModificadoIndex].estado = estado;
        setPedidos(nuevosPedidos);
      } else {
        console.error('Error al modificar el pedido:', response.statusText);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }

    setShowMenu(false);
  };

  const confirmarEliminarPedido = (id) => {
    setSelectedPedidoId(id);
    setShowDeleteModal(true);
  };

  // ...
const handleEliminarPedido = async () => {
  try {
    if (!selectedPedidoId) {
      console.error('No se ha seleccionado un pedido para eliminar.');
      return;
    }

    // Eliminar pedido desde el backend
    const response = await fetch(`http://localhost:3001/pedidos/${selectedPedidoId}`, { method: 'DELETE' });

    if (response.ok) {
      console.log('Pedido eliminado correctamente en el backend');

      // Actualizar la lista de pedidos localmente
      const nuevosPedidos = pedidos.filter((pedido) => pedido.id_pedido !== selectedPedidoId);
      setPedidos(nuevosPedidos);
    } else {
      console.error('Error al eliminar pedido:', response.statusText);
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
  }

  // Cerrar el modal de confirmación
  setShowDeleteModal(false);
};
// ...


  useEffect(() => {
    // Obtener pedidos desde el backend al cargar el componente
    fetch('http://localhost:3001/pedidos')
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error('Error al obtener pedidos:', error));
  }, []);

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
                  <div className="overflow-hidden md:rounded-lg">
                    <h1 className="lg:text-3xl text-2xl text-alitas_red font-Lilita_One uppercase"> PEDIDOS </h1>
                    <p className="lg:text-xl text-sm text-alitas_obs_red uppercase">Alitas le bro</p>
                    {/* Tabla de pedidos */}
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
                      <thead className="bg-alitas_beige">
                        <tr>
                        <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">ID Pedido</th>
                        <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Fecha</th>
                        <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Estado</th>
                        <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Total</th>
                        <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Filas de la tabla */}
                        {pedidos.map((pedido) => (
                          <tr key={pedido.id_pedido}>
                            <td className="px-4 py-4 whitespace-nowrap">#00{pedido.id_pedido}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{pedido.fecha}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full ${
                                  pedido.estado === 'Entregado'
                                    ? 'bg-green-100/60'
                                    : pedido.estado === 'Pendiente'
                                    ? 'bg-orange-100/60'
                                    : 'bg-red-100/60'
                                }`}
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={`bg-${pedido.estado === 'Entregado' ? 'green' : pedido.estado === 'Pendiente' ? 'orange' : 'red'}-500`} />
                                </svg>
                                <span className={`ml-2 ${pedido.estado === 'Entregado' ? 'text-green-500' : pedido.estado === 'Pendiente' ? 'text-orange-500' : 'text-red-500'}`}>{pedido.estado}</span>
                              </div>

                              {showMenu && pedido.id_pedido === selectedPedidoId && (
                                <div className="flex items-center mt-2 space-x-2">
                                  <button
                                    onClick={() => handleModificarPedido('Entregado')}
                                    className="bg-green-500 text-white px-2 py-2 rounded-full hover:bg-green-700"
                                  >
                                    Entregado
                                  </button>
                                  <button
                                    onClick={() => handleModificarPedido('Cancelado')}
                                    className="bg-red-500 text-white px-2 py-2 rounded-full hover:bg-red-700"
                                  >
                                    Cancelado
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">${pedido.total}.00</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleEditarPedido(pedido.id_pedido)}
                                  className="bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-700"
                                >
                                  <RiPencilFill />
                                </button>
                                <button
                                  onClick={() => confirmarEliminarPedido(pedido.id_pedido)}
                                  className="bg-red-500 text-white px-2 py-2 rounded-full hover:bg-red-700 ml-4"
                                >
                                  <RiDeleteBin6Fill />
                                </button>
                              </div>
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

          {/* Modal de confirmación para eliminar pedido */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end border-2 border-gray-400 justify-end min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                  &#8203;
                </span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-title"
                >
                  <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                          Confirmar Eliminación
                        </h3>
                        <p className="text-sm text-gray-500">¿Estás seguro de que quieres eliminar este pedido?</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={handleEliminarPedido}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-alitas_obs_red text-base font-medium text-white hover:bg-alitas_red focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Pedidos;
