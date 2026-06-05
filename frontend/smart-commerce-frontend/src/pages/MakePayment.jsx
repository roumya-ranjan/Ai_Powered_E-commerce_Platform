import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getTokenPayload, isLoggedIn } from "../utils/auth";

function MakePayment() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [payment, setPayment] = useState({ orderId: "", amount: "", paymentMethod: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoggedIn()) return navigate("/login");

        const payload = getTokenPayload();
        api.get(`/api/orders/user/${payload?.id}`)
            .then((res) => {
                // Only show PENDING orders — no point paying for already paid ones
                const pending = res.data.filter((o) => o.orderStatus === "PENDING");
                setOrders(pending);
            })
            .catch(console.error);
    }, []);

    const handleOrderSelect = (e) => {
        const selectedOrder = orders.find((o) => o.id === Number(e.target.value));
        setPayment({
            ...payment,
            orderId: e.target.value,
            amount: selectedOrder ? selectedOrder.totalAmount : "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        api.post("/api/payments", {
            ...payment,
            orderId: Number(payment.orderId),
            amount: Number(payment.amount),
        })
            .then((res) => {
                alert(res.data || "Payment successful!");
                navigate("/payments");
            })
            .catch(() => setError("Payment failed. Please try again."))
            .finally(() => setLoading(false));
    };

    const inputStyle = {
        width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0",
        borderRadius: 2, fontSize: 14, outline: "none",
        boxSizing: "border-box", marginBottom: 16, background: "#fff"
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: "#fff", padding: 32, borderRadius: 4, width: "100%", maxWidth: 440, border: "0.5px solid #e0e0e0" }}>

                <h4 style={{ marginBottom: 4, fontWeight: 600 }}>Make Payment</h4>
                <p style={{ fontSize: 13, color: "#878787", marginBottom: 24 }}>Complete your order payment</p>

                {error && (
                    <div style={{ background: "#fdecea", color: "#e53935", fontSize: 13, padding: "10px 12px", borderRadius: 2, marginBottom: 16 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Select Order *</label>
                    <select name="orderId" value={payment.orderId} onChange={handleOrderSelect} required style={inputStyle}>
                        <option value="">-- Select a pending order --</option>
                        {orders.length === 0 ? (
                            <option disabled>No pending orders found</option>
                        ) : (
                            orders.map((o) => (
                                <option key={o.id} value={o.id}>
                                    Order #{o.id} — ₹{o.totalAmount?.toLocaleString()} — {o.orderStatus}
                                </option>
                            ))
                        )}
                    </select>

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Amount (₹) *</label>
                    <input
                        name="amount" value={payment.amount} readOnly
                        placeholder="Auto-filled from order"
                        style={{ ...inputStyle, background: "#f5f5f5", color: "#212121", fontWeight: 600 }}
                    />

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Payment Method *</label>
                    <select name="paymentMethod" value={payment.paymentMethod} onChange={(e) => setPayment({ ...payment, paymentMethod: e.target.value })} required style={inputStyle}>
                        <option value="">Select payment method</option>
                        <option value="UPI">UPI</option>
                        <option value="CARD">Card</option>
                        <option value="NET_BANKING">Net Banking</option>
                        <option value="CASH">Cash on Delivery</option>
                    </select>

                    <button
                        type="submit" disabled={loading || orders.length === 0}
                        style={{ width: "100%", background: loading ? "#aaa" : "#388e3c", color: "#fff", border: "none", padding: "12px 0", borderRadius: 2, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                </form>

                {orders.length === 0 && (
                    <p style={{ textAlign: "center", fontSize: 13, marginTop: 16, color: "#878787" }}>
                        No pending orders?{" "}
                        <span onClick={() => navigate("/")} style={{ color: "#2874f0", cursor: "pointer" }}>
                            Shop now
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default MakePayment;