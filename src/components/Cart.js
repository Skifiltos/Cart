import React from "react";
import products from "../products";
import CartItem from "./CartItem";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useGlobalContext } from "../context/context";

const Cart = () => {
  const { products: prodotti } = useGlobalContext();

  if (prodotti.length === 0) {
    return (
      <section className="cart-info">
        <h6>Carrello vuoto</h6>
      </section>
    )
  }

  return (
    <section className="section-center" style={{ marginTop: "2rem" }} >
      <div className="cart-info">
        <h6>Item</h6>
        <h6 className="prd-name">Nome</h6>
        <h6>Qty</h6>
        <h6>Prezzo</h6>
        <button className="btn icon-btn">
          <MdRemoveShoppingCart className="icon minus-icon" />
        </button>
      </div>
      <br />
      <section className="cart-section">
        {
          products.map((el) => {
            return <CartItem key={el._id} {...el} />
          })
        }
      </section>
    </section >

  )

};

export default Cart;