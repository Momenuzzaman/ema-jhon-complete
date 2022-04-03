import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  const { name, img, seller, price, stock,key, } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt=""></img>
      </div>
      <div>
        <h4 className="product-name"><Link to={'/product/'+key}>{name}</Link></h4>
        <br />
        <p>
          <small>by:{seller}</small>
        </p>
        <br />
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock - order soon</small>
        </p>
       { props.showAddToCart === true && <button
          className="main-button"
          onClick={() => props.handleAddProduct(props.product)}
        >
          Add to cart
        </button>}
      </div>
    </div>
  );
};

export default Product;
