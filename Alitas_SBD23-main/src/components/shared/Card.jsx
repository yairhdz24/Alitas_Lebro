import React from "react";
import { RiAddFill } from "react-icons/ri";

const Card = (props) => {
  const { img, description, price, id, addToCart } = props;

  const handleAddToCart = () => {
    const product = {
      id,
      img,
      description,
      price: parseFloat(price),
      quantity: 1,
    };

    addToCart(product);
  };

  return (
    <div className="bg-alitas_beige p-10 rounded-xl flex flex-col gap-2 shadow-md items-center text-center text-alitas_black_red">
      <img
        src={img}
        alt={description}
        className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-3xl"
      />
      <p className="text-xl font-bold text-alitas_obs_red">{description}</p>
      {/* Estilo modificado para que el precio sea más visible */}
      <span className="text-alitas_black_red text-opacity-70 text-lg font-semibold">${price}</span>
      {/* Estilo modificado para el botón de agregar */}
      <button
        className="mt-3 text-xl bg-alitas_red text-white p-2 rounded-md"
        onClick={handleAddToCart}
      >
        <RiAddFill/>
      </button>
    </div>
  );
};

export default Card;