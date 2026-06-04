import { Link } from "react-router-dom";

function Navbar() {
    const isLoggedIn = localStorage.getItem("token");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Smart Commerce
                </Link>

                <div className="navbar-nav">
                    <Link className="nav-link" to="/products">Products</Link>
                    <Link className="nav-link" to="/products/add">Add Product</Link>
                    <Link className="nav-link" to="/orders">Orders</Link>
                    <Link className="nav-link" to="/orders/add">Place Order</Link>
                    <Link className="nav-link" to="/payments">Payments</Link>
                    <Link className="nav-link" to="/payments/add">Make Payment</Link>
                    <Link className="nav-link" to="/notifications">Notifications</Link>

                    {!isLoggedIn && (
                        <>
                            <Link className="nav-link" to="/register">Register</Link>
                            <Link className="nav-link" to="/login">Login</Link>
                        </>
                    )}

                    {isLoggedIn && (
                        <button
                            className="btn btn-danger btn-sm ms-3"
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;