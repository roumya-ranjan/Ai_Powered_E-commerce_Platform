import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Payments from "./pages/Payments";
import MakePayment from "./pages/MakePayment";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/update/:id" element={<UpdateProduct />} />
         <Route path="/orders" element={<Orders />} />
         <Route path="/orders/add" element={<PlaceOrder />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/add" element={<MakePayment />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;