
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Manage from './Components/Manage/Manage';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Review from './Components/Review/Review';
import Shop from './Components/Shops/Shop';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route path="/review" element={<Review></Review>}></Route>
        <Route path="/manage" element={<Manage></Manage>}></Route>
        <Route path="/" element={<Shop></Shop>}></Route>
        <Route path="/product/:productKey" element = {<ProductDetail></ProductDetail>}></Route>
      </Routes>
    </div>
  );
};

export default App;
