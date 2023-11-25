import React, { useState } from 'react';
import Sidebar from '../components/shared/Sidebar';
import { RiCloseLine, RiAddFill, RiFileList3Fill, RiMenu3Fill, RiDeleteBin6Fill, RiPencilFill } from 'react-icons/ri';

const Pedidos = () => {
  const [showMenu, setShowMenu] = useState(false);

  const menu = () => {
    setShowMenu(!showMenu);
    // Otras lógicas necesarias al hacer clic en el botón del menú
  };

  // Pedidos de prueba
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      factura: true,
      fecha: '2023-01-01',
      estado: 'En Proceso',
      cliente: 'Cliente de Prueba 1',
      compra: '$50.00',
    },
    {
      id: 2,
      factura: false,
      fecha: '2023-01-02',
      estado: 'Entregado',
      cliente: 'Cliente de Prueba 2',
      compra: '$75.00',
    },
    {
      id: 3,
      factura: true,
      fecha: '2023-01-03',
      estado: 'Enviado',
      cliente: 'Cliente de Prueba 3',
      compra: '$30.00',
    },
    // Puedes agregar más pedidos según sea necesario
  ]);

  const handleEliminarPedido = (id) => {
    const nuevosPedidos = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(nuevosPedidos);
  };

  const handleEditarPedido = (id) => {
    // Aquí puedes implementar la lógica para la edición del pedido
    console.log('Editar pedido', id);
  };

  return (
    <div className="bg-alitas_obs_beige w-full min-h-screen">
      <Sidebar showMenu={showMenu} />
      {/* NAV de móvil */}
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
          <h1>CREA UNA TABLA DE PEDIDOS Pedidos</h1>
          {/* Contenido adicional del componente de pedidos */}

          {/* Tabla de pedidos */}
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          {/* ... (encabezados de la tabla) */}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {/* Filas de la tabla */}
                        {pedidos.map((pedido) => (
                          <tr key={pedido.id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-x-3">
                                <input
                                  type="checkbox"
                                  className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                />
                                <button className="flex items-center gap-x-2">
                                  <span>{pedido.factura ? 'Factura' : 'Sin factura'}</span>
                                  <svg
                                    className="h-3"
                                    viewBox="0 0 10 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    {/* ... (contenido del svg) */}
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{pedido.fecha}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{pedido.estado}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{pedido.cliente}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{pedido.compra}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {/* Botón de eliminar */}
                              <button
                                onClick={() => handleEliminarPedido(pedido.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Eliminar"
                              >
                                <RiDeleteBin6Fill />
                              </button>
                              {/* Botón de editar */}
                              <button
                                onClick={() => handleEditarPedido(pedido.id)}
                                className="text-blue-600 hover:text-blue-900 ml-2"
                                title="Editar"
                              >
                                <RiPencilFill />
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


             {/* Paginación */}
            <div className="flex items-center justify-between mt-6">
              <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>
                  Anterior
                </span>
              </a>

              <div className="items-center hidden md:flex gap-x-3">
                <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
              </div>

              <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <span>
                  Siguiente
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Pedidos;



