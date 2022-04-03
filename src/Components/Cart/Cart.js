import React from "react";


const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce((total, product) => total + product.price, 0);

  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.5;
  } else if (total > 0) {
    shipping = 0;
  }
  return (
    <div>
      <h3>Order Summary</h3>
      <p>Item order {cart.length}</p>
      <p>Product Price: {total}</p>
      <p>Shipping: {shipping}</p>
      <p> Total Price: {total + shipping}</p>
      {
        props.children
      }
    </div>
  );
};

export default Cart;
