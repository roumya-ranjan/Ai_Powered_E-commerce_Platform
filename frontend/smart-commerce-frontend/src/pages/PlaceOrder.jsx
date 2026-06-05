import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getTokenPayload, isLoggedIn } from "../utils/auth";

function PlaceOrder() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({ userId: "", productId: "", quantity: 1 });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoggedIn()) return navigate("/login");

        const payload = getTokenPayload();
        setOrder((prev) => ({ ...prev, userId: payload?.id }));

        api.get("/api/products")
            .then((res) => setProducts(res.data))
            .catch(console.error);
    }, []);

    const handleProductSelect = (e) => {
        const product = products.find((p) => p.id === Number(e.target.value));
        setSelectedProduct(product || null);
        setOrder((prev) => ({ ...prev, productId: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (Number(order.quantity) < 1) return setError("Quantity must be at least 1");
        if (selectedProduct && Number(order.quantity) > selectedProduct.stockQuantity) {
            return setError(`Only ${selectedProduct.stockQuantity} items in stock`);
        }

        setLoading(true);
        api.post("/api/orders", {
            userId: Number(order.userId),
            productId: Number(order.productId),
            quantity: Number(order.quantity),
        })
            .then(() => {
                alert("Order placed successfully!");
                navigate("/orders");
            })
            .catch(() => setError("Failed to place order. Please try again."))
            .finally(() => setLoading(false));
    };

    const inputStyle = {
        width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0",
        borderRadius: 2, fontSize: 14, outline: "none",
        boxSizing: "border-box", marginBottom: 16, background: "#fff"
    };

    const total = selectedProduct ? selectedProduct.price * order.quantity : 0;

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: "#fff", padding: 32, borderRadius: 4, width: "100%", maxWidth: 440, border: "0.5px solid #e0e0e0" }}>

                <h4 style={{ marginBottom: 4, fontWeight: 600 }}>Place Order</h4>
                <p style={{ fontSize: 13, color: "#878787", marginBottom: 24 }}>Select a product and quantity</p>

                {error && (
                    <div style={{ background: "#fdecea", color: "#e53935", fontSize: 13, padding: "10px 12px", borderRadius: 2, marginBottom: 16 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Select product */}
                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Select Product *</label>
                    <select name="productId" value={order.productId} onChange={handleProductSelect} required style={inputStyle}>
                        <option value="">-- Choose a product --</option>
                        {products.map((p) => (
                            <option key={p.id} value={p.id} disabled={p.stockQuantity === 0}>
                                {p.name} — ₹{p.price?.toLocaleString()} {p.stockQuantity === 0 ? "(Out of stock)" : ""}
                            </option>
                        ))}
                    </select>

                    {/* Product summary card */}
                    {selectedProduct && (
                        <div style={{ background: "#f5f5f5", borderRadius: 4, padding: "12px 16px", marginBottom: 16, fontSize: 13 }}>
                            <div style={{ fontWeight: 600, marginBottom: 4 }}>{selectedProduct.name}</div>
                            <div style={{ color: "#878787" }}>
                                Price: ₹{selectedProduct.price?.toLocaleString()} · Stock: {selectedProduct.stockQuantity}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Quantity *</label>
                    <input
                        type="number" name="quantity" value={order.quantity} min="1"
                        max={selectedProduct?.stockQuantity || 999}
                        onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
                        required style={inputStyle}
                    />

                    {/* Total */}
                    {selectedProduct && (
                        <div style={{ background: "#e8f0fe", borderRadius: 4, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 14, color: "#2874f0" }}>Total Amount</span>
                            <span style={{ fontSize: 16, fontWeight: 700, color: "#2874f0" }}>₹{total.toLocaleString()}</span>
                        </div>
                    )}

                    <button
                        type="submit" disabled={loading}
                        style={{ width: "100%", background: loading ? "#aaa" : "#ff9f00", color: "#fff", border: "none", padding: "12px 0", borderRadius: 2, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}
                    >
                        {loading ? "Placing..." : "Place Order"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PlaceOrder;