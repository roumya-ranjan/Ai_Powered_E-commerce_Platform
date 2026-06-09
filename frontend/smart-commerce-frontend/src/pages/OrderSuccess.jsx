import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function OrderSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const { product, quantity, address, totalAmount, paymentMethod } = location.state || {};

    useEffect(() => {
        if (!product) navigate("/");
    }, []);

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ maxWidth: 500, width: "100%", background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", padding: 32, textAlign: "center" }}>

                {/* Success icon */}
                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontWeight: 700, color: "#388e3c", marginBottom: 8 }}>Order Placed Successfully!</h3>
                <p style={{ color: "#878787", fontSize: 14, marginBottom: 24 }}>
                    Your payment was successful and order has been placed.
                </p>

                {/* Order details */}
                <div style={{ background: "#f5f5f5", borderRadius: 4, padding: 16, marginBottom: 24, textAlign: "left" }}>
                    <div style={{ fontSize: 14, marginBottom: 8 }}>
                        <strong>Product:</strong> {product?.name}
                    </div>
                    <div style={{ fontSize: 14, marginBottom: 8 }}>
                        <strong>Quantity:</strong> {quantity}
                    </div>
                    <div style={{ fontSize: 14, marginBottom: 8 }}>
                        <strong>Amount Paid:</strong> ₹{totalAmount?.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 14, marginBottom: 8 }}>
                        <strong>Payment Method:</strong> {paymentMethod}
                    </div>
                    <div style={{ fontSize: 14 }}>
                        <strong>Deliver to:</strong> {address?.street}, {address?.city}
                    </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                    <button
                        onClick={() => navigate("/orders")}
                        style={{ flex: 1, background: "#2874f0", color: "#fff", border: "none", padding: "12px 0", borderRadius: 2, fontWeight: 600, cursor: "pointer" }}
                    >
                        View Orders
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        style={{ flex: 1, background: "#fff", color: "#2874f0", border: "1px solid #2874f0", padding: "12px 0", borderRadius: 2, fontWeight: 600, cursor: "pointer" }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;