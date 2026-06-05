import { useEffect, useState } from "react";
import api from "../services/api";
import { getTokenPayload, isAdmin, isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Payments() {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn()) return navigate("/login");

        const payload = getTokenPayload();
        const url = isAdmin() ? "/api/payments" : `/api/payments/user/${payload?.id}`;

        api.get(url)
            .then((res) => setPayments(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const statusColor = {
        SUCCESS: "#388e3c",
        FAILED: "#e53935",
        PENDING: "#ff9f00",
    };

    const methodIcon = {
        UPI: "📱",
        CARD: "💳",
        NET_BANKING: "🏦",
        CASH: "💵",
    };

    return (
        <div style={{ background: "#f1f3f6", minHeight: "100vh", padding: 24 }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h4 style={{ fontWeight: 600, margin: 0 }}>
                        {isAdmin() ? "All Payments" : "My Payments"}
                    </h4>
                    <button
                        onClick={() => navigate("/payments/add")}
                        style={{ background: "#388e3c", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 2, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                    >
                        + Make Payment
                    </button>
                </div>

                <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", overflow: "hidden" }}>
                    {loading ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#878787" }}>Loading payments...</div>
                    ) : payments.length === 0 ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#878787" }}>
                            No payments found.{" "}
                            <span onClick={() => navigate("/")} style={{ color: "#2874f0", cursor: "pointer" }}>Shop now</span>
                        </div>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: "#f5f5f5" }}>
                                    {["Payment ID", "Order ID", "Amount", "Method", "Status"].map((h) => (
                                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#212121" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.id} style={{ borderBottom: "1px solid #f0f0f0" }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
                                        onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                                    >
                                        <td style={{ padding: "12px 16px" }}>#{payment.id}</td>
                                        <td style={{ padding: "12px 16px" }}>#{payment.orderId}</td>
                                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>₹{payment.amount?.toLocaleString()}</td>
                                        <td style={{ padding: "12px 16px" }}>
                                            {methodIcon[payment.paymentMethod] || ""} {payment.paymentMethod}
                                        </td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <span style={{
                                                background: statusColor[payment.paymentStatus] || "#878787",
                                                color: "#fff", padding: "2px 10px",
                                                borderRadius: 2, fontSize: 11, fontWeight: 500
                                            }}>
                                                {payment.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Payments;