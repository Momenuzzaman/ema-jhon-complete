import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price}= props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid gray',
        marginBottom: '5px',
        paddingBottom: '10px',
    };
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <button className="main-button" onClick={()=>props.removeItem(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;