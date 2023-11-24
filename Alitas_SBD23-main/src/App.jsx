import { useState, useEffect } from "react";
import axios from "axios";
import {
  RiMenu3Fill,
  RiAddFill,
  RiFileList3Fill,
  RiCloseLine,
} from "react-icons/ri";
import Sidebar from './components/shared/Sidebar';
import Car from "./components/shared/Car";
import Card from "./components/shared/Card";
import Header from "./components/shared/Header";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/productos");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de productos", error);
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

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);
  
    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, agrégalo
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div className='bg-alitas_obs_beige w-full min-h-screen'>
      <Sidebar showMenu={showMenu} />
      <Car
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        cart={cart}
        removeFromCart={removeFromCart}
        total={calculateTotal()}
      />
      {/* Mobile menu */}
      <nav className="bg-alitas_beige lg:hidden fixed w-full bottom-0 left-0 text-3xl text-alitas_obs_red p-4 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <button className="p-2">
          <RiCloseLine />
        </button>
        <button className="p-2">
          <RiAddFill />
        </button>
        <button onClick={orders} className="p-2">
          <RiFileList3Fill />
        </button>
        <button onClick={menu} className="p-2">
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </nav>
      {/* Main */}
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          {/* Header */}
          <Header />
          {/* Title Menu */}
          <div className="flex item-center justify-between mb-16">
            <h2 className="text-3xl font-Lilita_One text-alitas_obs_red">Inserte alimentos a la orden</h2>
          </div>
          { /* Content */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Mapear sobre la lista de productos desde la base de datos */}
            {productos.map((producto) => (
              <Card
                key={producto.id}
                img={producto.imagen}
                description={producto.descripcionproducto}
                price={producto.precio}
                id={producto.id}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
