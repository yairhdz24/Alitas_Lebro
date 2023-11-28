import React, { useState, useEffect } from "react";
import { RiCloseLine, RiDeleteBin6Fill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterCliente from './RegisterCliente';

const Car = (props) => {
  const { showOrder, setShowOrder, cart, removeFromCart, total: externalTotal } = props;
  const [clientes, setClientes] = useState([]);
  const [selectedClienteId, setSelectedClienteId] = useState("");
  const [pedidoCreado, setPedidoCreado] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [numeroOrden, setNumeroOrden] = useState(1);
  const [internalTotal, setInternalTotal] = useState(0);

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

  useEffect(() => {
    setInternalTotal(externalTotal);
  }, [externalTotal]);

  const handleRealizarPedido = async () => {
    if (!selectedClienteId) {
      toast.error("Seleccione un cliente antes de realizar un pedido.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Añada al menos un producto al carrito antes de realizar un pedido.");
      return;
    }

    try {
      console.log("Datos del pedido:", {
        idCliente: selectedClienteId,
        productos: cart.map((product) => ({ id: product.id, cantidad: product.quantity })),
        total: Number(internalTotal.toFixed(2)),
      });

      const responsePedido = await fetch("http://localhost:3001/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCliente: selectedClienteId,
          productos: cart.map((product) => ({ id: product.id, cantidad: product.quantity })),
          total: Number(internalTotal.toFixed(2)),
        }),
      });

      if (responsePedido.ok) {
        const nuevoPedido = await responsePedido.json();
        // setPedidoCreado(`Pedido creado exitosamente. Orden #${nuevoPedido.id_pedido}`);
        setNumeroOrden((prevNumeroOrden) => prevNumeroOrden + 1);
        toast.success("Pedido creado exitosamente. ¡Gracias por su compra!");
        console.log("Pedido realizado exitosamente");
      } else {
        setPedidoCreado("Error al crear el pedido");
        toast.error("Error al crear el pedido. Inténtelo de nuevo.");
        console.error("Error al realizar el pedido");
      }
    } catch (error) {
      setPedidoCreado("Error de red al crear el pedido");
      toast.error("Error de red al crear el pedido. Verifique su conexión.");
      console.error("Error de red al realizar el pedido", error);
    }
  };

  return (
    <>
      <div
        className={`lg:col-span-2 bg-alitas_beige fixed top-0 w-full h-full lg:right-0 lg:w-96 transition-all z-50 ${showOrder ? "right-0" : "-right-full"
          }`}
      >
        <div className="relative h-full pt-16 p-8 lg:pt-8 text-alitas_obs_red">
          <RiCloseLine
            onClick={() => setShowOrder(false)}
            className="lg:hidden absolute left-4 top-4 p-3 box-content text-alitas_red bg-alitas_obs_beige rounded-full text-2xl"
          />
          <h1 className="text-2xl mt-4">Orden #{numeroOrden}</h1>
          <form className="flex items-center gap-2 flex-wrap mt-4 mb-8">
            <h1 className="text-xl text-alitas_obs_red">Cliente:</h1>
            <select
              className="bg-alitas_obs_beige w-full py-2 px-4 rounded-xl outline-none"
              value={selectedClienteId || ""}
              onChange={(e) => setSelectedClienteId(e.target.value)}
            >
              <option value="" disabled>
                Seleccione un cliente existente o Registre uno
              </option>
              {clientes.map((cliente) => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nombre}
                </option>
              ))}
            </select>

            <button
              className="bg-alitas_red text-white text-lg px-4 py-2 rounded-lg "
              onClick={(e) => {
                e.preventDefault();
                setShowRegisterModal(true);
              }}
            >
              Registrar Cliente
            </button>

            {showRegisterModal && (
              <RegisterCliente
                isOpen={showRegisterModal}
                closeModal={() => setShowRegisterModal(false)}
                onRegisterCliente={() => {
                  fetchClientes();
                  setShowRegisterModal(false);
                }}
              />
            )}

          </form>
          <div>
            <div className="grid grid-cols-6 mb-4 p-4">
              <h5 className="col-span-4 font-semibold text-lg">Producto</h5>
              <h5 className="font-semibold text-lg">Cant</h5>
              <h5 className="font-semibold text-lg">Precio</h5>
            </div>
            <div className="h-[400px] md:h-[700px] lg:h-[540px] overflow-y-scroll">
              {cart.map((product) => (
                <div key={product.id} className="bg-alitas_obs_beige p-4 rounded-xl mb-4">
                  <div className="grid grid-cols-6 mb-4">
                    <div className="col-span-4 flex items-center gap-2">
                      <img src={product.img} className="w-10 h-10 object-cover rounded-full" alt={product.description} />
                      <div>
                        <h5 className="text-sm">{product.description}</h5>
                        <p className="text-xs text-opacity-10">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <span>{product.quantity}</span>
                    </div>
                    <div>
                      <span>${(product.price * product.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 items-center gap-2">
                    <div className="col-span-5"></div>
                    <div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="border border-alitas_obs_red p-2 rounded-lg"
                      >
                        <RiDeleteBin6Fill className="text-alitas_obs_red" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`bg-alitas_beige absolute w-full bottom-0 left-0 p-4 ${pedidoCreado ? 'mt-2' : ''}`}>
            <div className="flex items-center justify-between">
              <span className="text-alitas_obs_red font-semibold text-lg">Total</span>
              <span className="text-alitas_red font-bold text-xl">${internalTotal.toFixed(2)}</span>
            </div>
            <button className="bg-alitas_obs_red text-white text-lg w-full py-3 pl-8 pr-4 mt-4 rounded-xl" onClick={handleRealizarPedido}>
              Realizar pedido
            </button>
            {pedidoCreado && (
              <div className={pedidoCreado.startsWith("Error") ? "text-red-500" : "text-green-500"} mt-2>
                {pedidoCreado}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Car;
