import React from 'react';
import Logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
           <img src={Logo}alt=""></img>
           <nav className="nav">
                 <a href="/shop">Shop</a>
                 <a href="/review">Review</a>
                 <a href="/manage">Manage</a>
           </nav>
        </div>
    );
};

export default Header;  