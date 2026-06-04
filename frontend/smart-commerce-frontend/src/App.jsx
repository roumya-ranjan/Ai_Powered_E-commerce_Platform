import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Payments from "./pages/Payments";
import MakePayment from "./pages/MakePayment";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/add" element={<AddProduct />} />
         <Route path="/orders" element={<Orders />} />
         <Route path="/orders/add" element={<PlaceOrder />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/add" element={<MakePayment />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;