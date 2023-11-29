import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RegisterCliente = ({ isOpen, closeModal, onRegisterCliente }) => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [error, setError] = useState('');

  const handleNombreChange = (e) => {
    setNombreCliente(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefonoCliente(e.target.value);
  };

  const handleRegistrarCliente = async () => {
    // Validar que ambos campos estén llenos
    if (!nombreCliente || !telefonoCliente) {
      setError('Rellenar todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreCliente,
          telefono: telefonoCliente,
        }),
      });

      if (response.ok) {
        toast.success('Cliente registrado exitosamente.');
        closeModal();
        window.location.reload();
        onRegisterCliente();
      } else {
        toast.error('Error al registrar nuevo cliente.');
      }
    } catch (error) {
      toast.error('Error de red al registrar nuevo cliente', error);
    }
  };

  const handleClickRegistrar = () => {
    // Reiniciar el estado de error al hacer clic en "Registrar"
    setError('');
    // Llamar a la función de registro
    handleRegistrarCliente();
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-end min-h-screen px-4 pt-4 pb-520 text-center sm:block sm:p-0">
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
      
          <div className="relative inline-block w-full max-w-sm p-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:p-6 sm:align-middle border-gray-300 border-2 sm:right-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize" id="modal-title">
                Registrar Cliente
              </h3>

              <form className="mt-4" action="#">
                <label htmlFor="nombre" className="text-sm text-gray-900">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre del cliente"
                  value={nombreCliente}
                  onChange={handleNombreChange}
                  className={`block w-full px-4 py-3 text-sm text-gray-700 bg-white border ${nombreCliente === '' ? 'border-gray-200' : 'border-red-500'} rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />

                <label htmlFor="telefono" className="mt-3 text-sm text-gray-700">
                  Teléfono:
                </label>
                <input
                  type="tel"
                  name="telefono"
                  id="telefono"
                  placeholder="Número telefónico"
                  value={telefonoCliente}
                  onChange={handleTelefonoChange}
                  className={`block w-full px-4 py-3 text-sm text-gray-700 bg-white border ${telefonoCliente === '' ? 'border-gray-200' : 'border-red-500'} rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />

                {error && (
                  <div className="text-red-500 mt-2">
                    <span className="mr-1">⚠️</span>
                    {error}
                  </div>
                )}

                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleClickRegistrar}
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterCliente;
