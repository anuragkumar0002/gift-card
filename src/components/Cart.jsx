import React, { useState } from "react";

import "../css/Cart.css";

const Cart = () => {
  const [quantity, setQuantity] = useState(0);
  const food_list = [
    { id: 0, name: "Friendship Card", price: 200, quantity: "1", total: 200 },
    { id: 1, name: "Friendship Card", price: 200, quantity: "3", total: 600 },
    { id: 2, name: "Friendship Card", price: 200, quantity: "2", total: 400 },
  ];

  const addItem = () => {
    setQuantity(quantity + 1);
  };
  const removeItem = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };
  return (
    <div className="container cart">
      <div className="cart-items">
        <div className="cart-items-title" id="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          return (
            <div className="">
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>
                  <span
                    className="border border-1 p-1 icon"
                    onClick={removeItem}
                  >
                    <i class="fa-solid fa-minus"></i>
                  </span>
                  <span className="p-2">{quantity}</span>
                  <span className="border border-1 p-1 icon" onClick={addItem}>
                    <i class="fa-solid fa-plus"></i>
                  </span>
                </p>
                <p>${item.total}</p>
                <p className="cross">
                  <i className="fa-solid fa-trash text-danger"></i>
                </p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div className="cart-bottom pb-4">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p className="mb-0">Subtotal</p>
              <p className="mb-0">{0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p className="mb-0">Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>total</b>
              <b>{0}</b>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p className="mb-0">If You have a promo code, Enter it here</p>
          </div>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
