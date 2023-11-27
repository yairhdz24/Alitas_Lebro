import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from '../components/shared/Sidebar';
import { 
  RiCloseLine,
  RiAddFill,
  RiFileList3Fill,
  RiMenu3Fill,
  RiAccountCircleFill
} from 'react-icons/ri';

const Clientes = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [selectedClienteId, setSelectedClienteId] = useState('');
    const [selectedClientNombre, setSelectedClientNombre] = useState('');
    const [selectedClientTelefono, setSelectedClientTelefono] = useState('');
    const [colorsClientes, setColorsClientes] = useState([]);
    const colores = ["#733c3c", "#98a360", "#60a39b", "#63548a", "#9c5c98"];

    useEffect(() => {
//      const fetchProductos = async () => {
//        try {
//          const response = await axios.get("http://localhost:3001/clientes");
//          setClientes(response.data);
//
//          // Datos de prueba
          const datosPrueba = [
            { id_cliente: 1, nombre: "Diego", telefono: "123456789" },
            { id_cliente: 2, nombre: "Yair", telefono: "987654321" },
            { id_cliente: 3, nombre: "Lalo", telefono: "987654321" },
            { id_cliente: 4, nombre: "Diego2", telefono: "123456789" },
            { id_cliente: 5, nombre: "Yair2", telefono: "987654321" },
            { id_cliente: 6, nombre: "Lalo2", telefono: "987654321" },
          ];
//              
//          const datosFinales = [...response.data, ...datosPrueba];
//          console.log("Datos finales después de agregar datos de prueba:", datosFinales);
//
          setClientes(datosPrueba);
          console.error("YA JALA");
//          
//        } catch (error) {
//          console.error("Error al obtener la lista de clientes", error);
//        }
//      };
//
//      fetchProductos();
    }, []);



    const menu = () => {
      setShowMenu(!showMenu);
      setShowOrder(false);
    };

    const orders = () => {
      setShowOrder(!showOrder);
      setShowMenu(false);
    };

    const addClient = () => {

    }

    const deleteClient = (id) => {
      // Eliminar pedido desde el backend
      fetch(`http://localhost:3001/clientes/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.status === 200) {
            // Actualizar la lista de pedidos después de la eliminación
            setClientes(clientes.filter((clientes) => clientes.id_cliente !== id));
          } else {
            console.error('Error al eliminar cliente:', response.statusText);
          }
        })
        .catch((error) => console.error('Error al eliminar cliente:', error));
    };

    const modifyClient = async () => {
      try {
        console.log('ID de Cliente seleccionado:', selectedClienteId);
        console.log('Nuevo Nombre:', selectedClientNombre);
        console.log('Nuevo Telefono:', selectedClientTelefono);
  
        const response = await fetch(`http://localhost:3001/clientes/${selectedClienteId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nuevoNombre: selectedClientNombre, nuevoTelefono: selectedClientTelefono }),
        });
  
        if (response.ok) {
          console.log('Cliente modificado exitosamente');
          // Actualizar el estado local
          const newClientes = [...clientes]; // Copiar el estado actual
          const modifiedClientId = newClientes.findIndex(clientes => clientes.id_cliente === selectedClienteId);
          newClientes[modifiedClientId].nombre = selectedClientNombre;
          newClientes[modifiedClientId].telefono = selectedClientTelefono;
          setClientes(newClientes); // Actualizar el estado local
        } else {
          console.error('Error al modificar el pedido:', response.statusText);
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
  
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

            {/* Sección tabla de clientes */}
            <section className="container px-4 mx-auto">
              <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
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
                          </tr>
                        </thead>
                        <tbody>
                          {clientes.map((cliente, index) => (
                          <tr key={cliente.id}>
                            <td className={`px-4 py-4 whitespace-nowrap text-xl`} style={{ color: colores[index % colores.length] }}>
                              <RiAccountCircleFill />
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">{cliente.id_cliente}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{cliente.nombre}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{cliente.telefono}</td>
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
  
  export default Clientes;