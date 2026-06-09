import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Address from "./pages/Address";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Orders from "./pages/Orders";  
import OrderSuccess from "./pages/OrderSuccess";
import PlaceOrder from "./pages/PlaceOrder";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import MakePayment from "./pages/MakePayment";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes — NO Navbar */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* All other routes — WITH Navbar */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/update/:id" element={<UpdateProduct />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/add" element={<PlaceOrder />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payments/add" element={<MakePayment />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/address" element={<Address />} />
            </Routes>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;