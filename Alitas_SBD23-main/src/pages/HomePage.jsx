import { useState, useEffect } from "react";
import axios from "axios";
import { RiMenu3Fill, RiAddFill, RiFileList3Fill, RiCloseLine, } from "react-icons/ri";
import Sidebar from '../components/shared/Sidebar';
import Car from "../components/shared/Car";
import Card from "../components/shared/Card";
import Header from "../components/shared/Header";
import { Fotter } from "../components/Fotter";

//Imagenes 
import Alitas12Image from '../images/Alitas12.jpg';
import Alitas8Image from '../images/Alitas8.jpg';
import BonelessImage from '../images/Boneles.jpg';
import FrancesaImage from '../images/Francesas.jpg';
import GajoImage from '../images/Gajo.jpg';

const HomePage = () => {
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
      // Si el producto ya esta en el carrito, incrementa la cantidad
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Si el producto no esta en el carrito, agregalo
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const getImageForProduct = (imageName) => {
    // Mapea el nombre de la imagen a la imagen importada correspondiente
    switch (imageName) {
      case 'Alitas12':
        return Alitas12Image;
      case 'Alitas8':
        return Alitas8Image;
      case 'Boneless':
        return BonelessImage;
      case 'Francesa':
        return FrancesaImage;
      case 'Gajo':
        return GajoImage;
      default:
        return Alitas12Image; // Imagen predeterminada
    }
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
      {/* NAV de mobil */}
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

          <Header />

          <div className="flex item-center justify-between mb-16">
            <h2 className="text-3xl font-Lilita_One text-alitas_obs_red">Inserte alimentos a la orden</h2>
          </div>

          { /* Contenido del backend PRODUCTOS */}

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Mapear sobre la lista de productos desde la base de datos */}
            {productos.length > 0 ? (
              productos.map((producto) => (
                <Card
                key={producto.id}
                img={getImageForProduct(producto.imagen)}
                description={producto.descripcionproducto}
                price={producto.precio}
                id={producto.id}
                addToCart={addToCart}
              />
              ))
            ) : (
              <h2 className="text-3xl font-Lilita_One text-alitas_obs_red">
                Error al cargar productos. Por favor, inténtalo de nuevo más tarde.
              </h2>
            )}
          </div>
        </div>
      </main>
      <Fotter/>
    </div>
  );
}

export default HomePage;