import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { isAdmin } from "../../utils/auth";

function AdminPayments() {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    useEffect(() => {
        if (!isAdmin()) return navigate("/login");

        api.get("/api/payments")
            .then((res) => setPayments(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const statusColor = {
        CREATED: "#ff9f00",
        SUCCESS: "#388e3c",
        FAILED: "#e53935",
        PENDING: "#2874f0"
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", fontFamily: "sans-serif" }}>
            <div style={{ background: "#2874f0", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span
                        onClick={() => navigate("/admin/dashboard")}
                        style={{ color: "#fff", cursor: "pointer", fontSize: 13, opacity: .8 }}
                    >
                        ← Dashboard
                    </span>
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>Manage Payments</span>
                </div>

                <button onClick={handleLogout} style={{ background: "#fff", border: "none", color: "#2874f0", padding: "4px 16px", borderRadius: 2, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                    Logout
                </button>
            </div>

            <div style={{ padding: 24 }}>
                <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
                        <h5 style={{ margin: 0, fontWeight: 600 }}>All Payments ({payments.length})</h5>
                    </div>

                    {loading ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#878787" }}>Loading payments...</div>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: "#f5f5f5" }}>
                                    {["Payment ID", "Order ID", "Amount", "Method", "Status", "Transaction ID"].map((h) => (
                                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#212121" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ padding: 32, textAlign: "center", color: "#878787" }}>
                                            No payments found
                                        </td>
                                    </tr>
                                ) : payments.map((payment) => (
                                    <tr key={payment.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                                        <td style={{ padding: "12px 16px" }}>#{payment.id}</td>
                                        <td style={{ padding: "12px 16px" }}>{payment.orderId}</td>
                                        <td style={{ padding: "12px 16px" }}>₹{payment.amount?.toLocaleString()}</td>
                                        <td style={{ padding: "12px 16px" }}>{payment.paymentMethod || "N/A"}</td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <span style={{ background: statusColor[payment.paymentStatus] || "#878787", color: "#fff", padding: "2px 10px", borderRadius: 2, fontSize: 11 }}>
                                                {payment.paymentStatus}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 16px" }}>{payment.transactionId || "N/A"}</td>
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

export default AdminPayments;