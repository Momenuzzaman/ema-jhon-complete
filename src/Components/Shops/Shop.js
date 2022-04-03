import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Porducts/Product";
import "./Shop.css";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    const saveCart = getDatabaseCart();
    const productKey = Object.keys(saveCart);
    const previousCart = productKey.map(existingKey => {
      const product  = fakeData.find(pd =>pd.key === existingKey);
      product.quantity = saveCart[existingKey];
      return product;
    });
    setCart(previousCart);
  },[]);

  const handleAddProduct = (product) => {
    const sameProduct = cart.find(pd => pd.key === product.key);
    let count = 1;
    let newCart;
    if(sameProduct) {
       count = sameProduct.quantity +1;
      sameProduct.quantity = count;
      const other = cart.filter(pd => pd.key !== product.key);
      newCart = [...other,sameProduct];
    }
    else{
      product.quantity = 1;
      newCart = [...cart, product];
    }

    setCart(newCart);
   
    addToDatabaseCart(product.key,count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
          key = {product.key}
            showAddToCart={true}
            product={product}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
            <Link to='/review'>
             <button className='main-button'>Order Summary</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
