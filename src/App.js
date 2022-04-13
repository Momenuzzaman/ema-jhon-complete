
import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Manage from './Components/Manage/Manage';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Review from './Components/Review/Review';
import Shipment from './Components/Shipment/Shipment';
import Shop from './Components/Shops/Shop';


export const  UserContext = createContext();

function App() {

  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider className="app" value ={[loggedInUser,setLoggedInUser]}>
      <h3>Email:{loggedInUser.email}</h3>
      <Header></Header>
      <Routes>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route path="/review" element={<Review></Review>}></Route>
        
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Shop></Shop>}></Route>
        <Route path="/product/:productKey" element = {<ProductDetail></ProductDetail>}></Route>
        <Route path="/*" element = {<PrivateRoute></PrivateRoute>}>
          <Route path="shipment" element={<Shipment></Shipment>}></Route>
          <Route path="manage" element={<Manage></Manage>}></Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
