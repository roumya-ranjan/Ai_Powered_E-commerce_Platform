import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { isAdmin, logout } from "../../utils/auth";

function AdminOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login");
};

    useEffect(() => {
        if (!isAdmin()) return navigate("/login");
        api.get("/api/orders")
            .then((res) => setOrders(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const updateStatus = (orderId, newStatus) => {
        api.put(`/api/orders/${orderId}/status`, { status: newStatus })
            .then(() => {
                setOrders(orders.map((o) =>
                    o.id === orderId ? { ...o, orderStatus: newStatus } : o
                ));
            })
            .catch(() => alert("Failed to update status"));
    };

    const statusColor = { PENDING: "#ff9f00", CONFIRMED: "#2874f0", DELIVERED: "#388e3c", CANCELLED: "#e53935" };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", fontFamily: "sans-serif" }}>
            {/* Header */}
            <div style={{ background: "#2874f0", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span
                        onClick={() => navigate("/admin/dashboard")}
                        style={{ color: "#fff", cursor: "pointer", fontSize: 13, opacity: .8 }}
                    >
                        ← Dashboard
                    </span>
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>Manage Orders</span>
                </div>
                <button onClick={handlelogout} style={{ background: "#fff", border: "none", color: "#2874f0", padding: "4px 16px", borderRadius: 2, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                    Logout
                </button>
            </div>

            <div style={{ padding: 24 }}>
                <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h5 style={{ margin: 0, fontWeight: 600 }}>All Orders ({orders.length})</h5>
                    </div>

                    {loading ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#878787" }}>Loading orders...</div>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: "#f5f5f5" }}>
                                    {["Order ID", "User ID", "Product ID", "Qty", "Total", "Status", "Update Status"].map((h) => (
                                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#212121" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr><td colSpan="7" style={{ padding: 32, textAlign: "center", color: "#878787" }}>No orders found</td></tr>
                                ) : orders.map((order) => (
                                    <tr key={order.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                                        <td style={{ padding: "12px 16px" }}>#{order.id}</td>
                                        <td style={{ padding: "12px 16px" }}>{order.userId}</td>
                                        <td style={{ padding: "12px 16px" }}>{order.productId}</td>
                                        <td style={{ padding: "12px 16px" }}>{order.quantity}</td>
                                        <td style={{ padding: "12px 16px" }}>₹{order.totalAmount?.toLocaleString()}</td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <span style={{ background: statusColor[order.orderStatus] || "#878787", color: "#fff", padding: "2px 10px", borderRadius: 2, fontSize: 11 }}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                style={{ border: "1px solid #e0e0e0", borderRadius: 2, padding: "4px 8px", fontSize: 12, cursor: "pointer" }}
                                            >
                                                <option>PENDING</option>
                                                <option>CONFIRMED</option>
                                                <option>DELIVERED</option>
                                                <option>CANCELLED</option>
                                            </select>
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

export default AdminOrders;