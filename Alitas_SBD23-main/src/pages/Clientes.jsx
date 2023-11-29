import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from '../components/shared/Sidebar';
import {
  RiCloseLine,
  RiAddFill,
  RiFileList3Fill,
  RiMenu3Fill,
  RiAccountCircleFill,
  RiPencilFill,
  RiDeleteBin6Fill,
} from 'react-icons/ri';

const Clientes = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [selectedClienteId, setSelectedClienteId] = useState(null);
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');

  const confirmarEliminarCliente = (id) => {
    setSelectedClienteId(id);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3001/clientes");
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error al obtener la lista de clientes", error);
      }
    };

    fetchClientes();
  }, []);

  const menu = () => {
    setShowMenu(!showMenu);
  };

  const handleEditarCliente = (id, nombre, telefono) => {
    console.log("Cliente ID seleccionado:", id);
    setSelectedClienteId(id);
    setNombreCliente(nombre);
    setTelefonoCliente(telefono);
    setShowMenu(true);
  };

  const handleEliminarCliente = async () => {
    try {
      if (!selectedClienteId) {
        console.error('No se ha seleccionado un pedido para eliminar.');
        return;
      }
    
      // Eliminar pedido desde el backend
      const response = await fetch(`http://localhost:3001/clientes/${selectedClienteId}`, { method: 'DELETE' });
    
      if (response.ok) {
        console.log('cliente eliminado correctamente en el backend');
    
        // Actualizar la lista de pedidos localmente
        const nuevosClietes = clientes.filter((cliente) => cliente.id_cliente !== selectedClienteId);
        setClientes(nuevosClietes);

      } else {
        console.error('Error al eliminar cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
    
    // Cerrar el modal de confirmación
    setShowDeleteModal(false);
  };
  

  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(`http://localhost:3001/clientes/${selectedClienteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreCliente,
          telefono: telefonoCliente,
        }),
      });

      if (response.ok) {
        // Actualizar el estado local con los cambios
        const updatedClientes = clientes.map((cliente) =>
          cliente.id_cliente === selectedClienteId
            ? { ...cliente, nombre: nombreCliente, telefono: telefonoCliente }
            : cliente
        );

        setClientes(updatedClientes);
        setShowMenu(false);
      } else {
        console.error('Error al actualizar el cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  const colores = ["#733c3c", "#98a360", "#60a39b", "#63548a", "#9c5c98"];

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
          <h1 className="lg:text-3xl text-2xl text-alitas_red font-Lilita_One uppercase"> CLIENTES </h1>
          <p className="lg:text-xl text-sm text-alitas_obs_red uppercase">Alitas le bro</p>

          {/* Tabla de clientes */}
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
                      <thead className="bg-alitas_beige">
              <tr>
                <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase"></th>
                <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">ID</th>
                <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Nombre</th>
                <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Telefono</th>
                <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={cliente.id_cliente}>
                  <td className={`px-4 py-4 whitespace-nowrap text-4xl`} style={{ color: colores[index % colores.length] }}>
                    <RiAccountCircleFill />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">#{cliente.id_cliente}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{cliente.nombre}</td>
                  <td className="px-4 py-4 whitespace-nowrap">+52 {cliente.telefono}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleEditarCliente(cliente.id_cliente, cliente.nombre, cliente.telefono)}
                        className="bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-700"
                      >
                        <RiPencilFill />
                      </button>
                      <button
                        onClick={() => confirmarEliminarCliente(cliente.id_cliente)}
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

          {/* Formulario de edición */}
          {showMenu && (
            <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-end min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                  &#8203;
                </span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-title"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Editar Cliente
                        </h3>
                        <div className="mt-2">
                          <div className="mb-4">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                              Nombre
                            </label>
                            <input
                              type="text"
                              name="nombre"
                              id="nombre"
                              value={nombreCliente}
                              onChange={(e) => setNombreCliente(e.target.value)}
                              className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                              Teléfono
                            </label>
                            <input
                              type="text"
                              name="telefono"
                              id="telefono"
                              value={telefonoCliente}
                              onChange={(e) => setTelefonoCliente(e.target.value)}
                              className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={handleGuardarCambios}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-alitas_obs_red text-base font-medium text-white hover:bg-alitas_red focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => setShowMenu(false)}
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

          {/* Modal de confirmación para eliminar cliente */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-end min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Confirmar Eliminación
                        </h3>
                        <p className="text-sm text-gray-500">¿Estás seguro de que quieres eliminar este cliente?</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={handleEliminarCliente}
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

export default Clientes;
