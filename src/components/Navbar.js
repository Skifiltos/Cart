import React from "react";
import { HiShoppingCart } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="nav">
      <header className="nav-header">
        <div className="nav-brand">
          <h4>CartShop</h4>
        </div>
        <div className="nav-cart">
          <HiShoppingCart className="cart-icon" />
          <div className="cart-counter">
            {0}
          </div>
        </div>
      </header>
    </nav >
  );
};

export default Navbar;
