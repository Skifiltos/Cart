import React from "react";
import { MdDelete } from "react-icons/md";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useGlobalContext } from "../context/context";
import { DIMINUISCE_QTY } from "../context/actions";


const CartItem = ({ _id, name, image, price, qty, countInStock }) => {

  // IMPORTO FUNZIONI E STATE DAL GLOBALECONTEXT
  const { deleteItem, addQty, dimQty } = useGlobalContext();


  // AUMENTO QUANTITA'
  const aggiungiQty = (_id) => {
    if (qty + 1 > countInStock) {
      return
    }
    return addQty(_id)
  }

  // DISMINUO QUANTITA'
  const diminuisciQty = (_id) => {
    if (qty - 1 <= 0) {
      return deleteItem(_id)
    }
    return dimQty(_id)
  }

  return (
    <article className="cart-item">
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <p className="prd-name">{name}</p>
      <div className="qyt-selector">
        <button className="btn icon btn" onClick={() => aggiungiQty(_id)}>
          <BiPlus className="icon" />
        </button>
        <p>
          {qty}
        </p>
        <button className="btn icon btn" onClick={() => diminuisciQty(_id)}>
          <BiMinus className="icon" />
        </button>
      </div>
      <p>{price} €</p>
      <button className="btn icon-btn" onClick={() => deleteItem(_id)}>
        <MdDelete className="icon minus-icon" />
      </button>
    </article>

  );
};

export default CartItem;
