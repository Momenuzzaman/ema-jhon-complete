import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fakeData from '../../fakeData';
import happyImage from '../../images/giphy.gif';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItems/ReviewItem';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    let navigate = useNavigate();
    const handleCheckout = () =>{
      navigate("/shipment")
    }

    const removeItem = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(()=>{
        // cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);


    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=''></img>
    }
    return (
        <div className='twin-container'>
          <div className='product-container'>    
            {
                cart.map(pd => <ReviewItem product={pd} removeItem={removeItem} key={pd.key}></ReviewItem>)
            }
           
            {
                thankYou
            }
          </div>
          <div>
              <Cart cart={cart}>
                 <button onClick = {handleCheckout} className='main-button'>Proceed Checkout</button>
              </Cart>
          </div>
        </div>
    );
};

export default Review;