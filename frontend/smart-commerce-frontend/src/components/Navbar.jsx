import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAdmin, isLoggedIn, logout } from "../utils/auth";

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLoggedIn(!!localStorage.getItem("token"));
        // update cart count
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    }, [location]);

    const handleLogout = () => {
        logout();
        localStorage.removeItem("cart");
        setLoggedIn(false);
        navigate("/login");
    };

    return (
        <nav style={{ background: "#2874f0", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
            <Link to="/" style={{ color: "#fff", fontWeight: 700, fontSize: 20, textDecoration: "none" }}>
                Smart Commerce
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                {loggedIn ? (
                    <>
                        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>Home</Link>
                        <Link to="/orders" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>My Orders</Link>
                        <Link to="/notifications" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>Notifications</Link>

                        {isAdmin() && (
                            <Link to="/admin/dashboard" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>
                                Admin Panel
                            </Link>
                        )}

                        {!isAdmin() && (
                            <Link to="/cart" style={{ color: "#fff", textDecoration: "none", fontSize: 14, position: "relative" }}>
                                🛒 Cart
                                {cartCount > 0 && (
                                    <span style={{
                                        position: "absolute", top: -8, right: -8,
                                        background: "#ff9f00", color: "#fff",
                                        borderRadius: "50%", width: 18, height: 18,
                                        fontSize: 10, fontWeight: 700,
                                        display: "flex", alignItems: "center", justifyContent: "center"
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        <button onClick={handleLogout}
                            style={{ background: "#fff", color: "#2874f0", border: "none", padding: "6px 16px", borderRadius: 2, fontWeight: 600, cursor: "pointer" }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        <button style={{ background: "#fff", color: "#2874f0", border: "none", padding: "6px 16px", borderRadius: 2, fontWeight: 600, cursor: "pointer" }}>
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;