import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getTokenPayload } from "../utils/auth";

function Payment() {
    const navigate = useNavigate();

    const [product] = useState(() => JSON.parse(sessionStorage.getItem("buyProduct") || "null"));
    const [quantity] = useState(() => Number(sessionStorage.getItem("buyQuantity")) || 1);
    const [address] = useState(() => JSON.parse(sessionStorage.getItem("deliveryAddress") || "null"));

    const [paymentMethod, setPaymentMethod] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!product || !address) {
        navigate("/");
        return null;
    }

    const totalAmount = product.price * quantity;

    const handlePayment = async () => {
        if (!paymentMethod) {
            setError("Please select a payment method");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const payload = getTokenPayload();
            const userId = payload?.id || payload?.userId;

            // Step 1 — Place order
            const orderRes = await api.post("/api/orders", {
                userId: userId,
                productId: product.id,
                quantity: Number(quantity),
                deliveryAddress: `${address.street}, ${address.city}, ${address.state} - ${address.pincode}`
            });

            const orderId = orderRes.data?.id || orderRes.data;

            // Step 2 — Make payment
            await api.post("/api/payments", {
                orderId: orderId,
                amount: totalAmount,
                paymentMethod: paymentMethod
            });

            // Clear sessionStorage
            sessionStorage.removeItem("buyProduct");
            sessionStorage.removeItem("buyQuantity");
            sessionStorage.removeItem("deliveryAddress");

            // Go to success page
            navigate("/order-success", {
                state: { product, quantity, address, totalAmount, paymentMethod }
            });

        } catch (err) {
            console.log("Payment error:", err.response?.data);
            setError("Payment failed: " + (err.response?.data || "Please try again"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", padding: 24 }}>
            <div style={{ maxWidth: 500, margin: "0 auto" }}>

                {/* Order Summary */}
                <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", padding: 24, marginBottom: 16 }}>
                    <h5 style={{ fontWeight: 600, marginBottom: 16 }}>Order Summary</h5>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                        <span>{product.name} × {quantity}</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "#388e3c" }}>
                        <span>Delivery</span>
                        <span>FREE</span>
                    </div>
                    <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                        <span>Total</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                </div>

                {/* Delivery Address */}
                <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", padding: 24, marginBottom: 16 }}>
                    <h5 style={{ fontWeight: 600, marginBottom: 12 }}>Delivering to</h5>
                    <div style={{ fontSize: 14 }}>
                        <div style={{ fontWeight: 600 }}>{address.fullName} | {address.phone}</div>
                        <div style={{ color: "#878787", marginTop: 4 }}>
                            {address.street}, {address.city}, {address.state} - {address.pincode}
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", padding: 24, marginBottom: 16 }}>
                    <h5 style={{ fontWeight: 600, marginBottom: 16 }}>Select Payment Method</h5>

                    {error && (
                        <div style={{ background: "#fdecea", color: "#e53935", fontSize: 13, padding: "10px 12px", borderRadius: 2, marginBottom: 16 }}>
                            {error}
                        </div>
                    )}

                    {[
                        { value: "UPI", label: "UPI", icon: "📱", desc: "Google Pay, PhonePe, Paytm" },
                        { value: "CARD", label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, RuPay" },
                        { value: "NET_BANKING", label: "Net Banking", icon: "🏦", desc: "All major banks" },
                        { value: "CASH", label: "Cash on Delivery", icon: "💵", desc: "Pay when delivered" },
                    ].map((method) => (
                        <div key={method.value} onClick={() => setPaymentMethod(method.value)}
                            style={{
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "12px 16px", borderRadius: 4, marginBottom: 8,
                                border: paymentMethod === method.value ? "2px solid #2874f0" : "1px solid #e0e0e0",
                                background: paymentMethod === method.value ? "#e8f0fe" : "#fff",
                                cursor: "pointer"
                            }}>
                            <span style={{ fontSize: 24 }}>{method.icon}</span>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>{method.label}</div>
                                <div style={{ fontSize: 12, color: "#878787" }}>{method.desc}</div>
                            </div>
                            <div style={{ marginLeft: "auto" }}>
                                <div style={{
                                    width: 18, height: 18, borderRadius: "50%",
                                    border: paymentMethod === method.value ? "5px solid #2874f0" : "2px solid #ccc"
                                }} />
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={handlePayment} disabled={loading}
                    style={{ width: "100%", background: loading ? "#aaa" : "#388e3c", color: "#fff", border: "none", padding: "14px 0", borderRadius: 2, fontSize: 16, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
                    {loading ? "Processing..." : `Pay ₹${totalAmount.toLocaleString()}`}
                </button>
            </div>
        </div>
    );
}

export default Payment;