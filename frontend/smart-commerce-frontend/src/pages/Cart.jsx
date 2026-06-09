import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (!isLoggedIn()) navigate("/login");
    }, []);

    const updateQuantity = (id, qty) => {
        if (qty < 1) return;
        const updated = cart.map(item =>
            item.id === id ? { ...item, quantity: qty } : item
        );
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const removeItem = (id) => {
        const updated = cart.filter(item => item.id !== id);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = (item) => {
        navigate("/address", {
            state: { product: item, quantity: item.quantity }
        });
    };

    if (cart.length === 0) {
        return (
            <div style={{ minHeight: "100vh", background: "#f1f3f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
                    <h4 style={{ fontWeight: 600, marginBottom: 8 }}>Your cart is empty</h4>
                    <p style={{ color: "#878787", marginBottom: 20 }}>Add some products to continue</p>
                    <button onClick={() => navigate("/")}
                        style={{ background: "#2874f0", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 2, fontWeight: 600, cursor: "pointer" }}>
                        Shop Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", padding: 24 }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <h4 style={{ fontWeight: 600, marginBottom: 20 }}>🛒 My Cart ({cart.length} items)</h4>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
                    {/* Cart items */}
                    <div>
                        {cart.map((item) => (
                            <div key={item.id} style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", padding: 16, marginBottom: 12, display: "flex", gap: 16 }}>
                                <img
                                    src={item.imageUrl || `https://placehold.co/80x80?text=${encodeURIComponent(item.name)}`}
                                    alt={item.name}
                                    style={{ width: 80, height: 80, objectFit: "contain" }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                                    <div style={{ fontSize: 12, color: "#878787", marginBottom: 8 }}>{item.category}</div>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: "#2874f0", marginBottom: 12 }}>
                                        ₹{item.price?.toLocaleString()}
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        {/* Quantity controls */}
                                        <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: 2 }}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                style={{ width: 32, height: 32, border: "none", background: "#fff", cursor: "pointer", fontSize: 16 }}>−</button>
                                            <span style={{ width: 40, textAlign: "center", fontSize: 14 }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                style={{ width: 32, height: 32, border: "none", background: "#fff", cursor: "pointer", fontSize: 16 }}>+</button>
                                        </div>

                                        <button onClick={() => removeItem(item.id)}
                                            style={{ background: "none", border: "none", color: "#e53935", cursor: "pointer", fontSize: 13 }}>
                                            Remove
                                        </button>

                                        <button onClick={() => handleCheckout(item)}
                                            style={{ background: "#ff9f00", border: "none", color: "#fff", padding: "6px 16px", borderRadius: 2, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 15 }}>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                </div>
                            </div>
                        ))}

                        <button onClick={clearCart}
                            style={{ background: "none", border: "1px solid #e53935", color: "#e53935", padding: "8px 16px", borderRadius: 2, cursor: "pointer", fontSize: 13 }}>
                            Clear Cart
                        </button>
                    </div>

                    {/* Price summary */}
                    <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", padding: 24, height: "fit-content" }}>
                        <h5 style={{ fontWeight: 600, marginBottom: 16, color: "#878787", fontSize: 13, textTransform: "uppercase" }}>
                            Price Details
                        </h5>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                                <span>{item.name} × {item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "#388e3c" }}>
                            <span>Delivery</span>
                            <span>FREE</span>
                        </div>
                        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <button onClick={() => navigate("/address", { state: { product: cart[0], quantity: cart[0].quantity } })}
                            style={{ width: "100%", background: "#ff9f00", color: "#fff", border: "none", padding: "12px 0", borderRadius: 2, fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 16 }}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;