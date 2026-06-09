import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {isAdmin, logout } from "../../utils/auth";

function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ products: 0, orders: 0, payments: 0, users: 0 });
    const handleLogout = () =>{
         localStorage.removeItem("token");
         localStorage.removeItem("cart");
         navigate("/login");
    };

    useEffect(() => {
        if (!isAdmin()) return navigate("/login");

        // Fetch counts for dashboard cards
        Promise.all([
            api.get("/api/products"),
            api.get("/api/orders"),
            api.get("/api/payments"),
        ]).then(([products, orders, payments]) => {
            setStats({
                products: products.data.length,
                orders: orders.data.length,
                payments: payments.data.length,
            });
        }).catch(console.error);
    }, []);

    const cards = [
        { label: "Total Products", value: stats.products, color: "#2874f0", path: "/admin/products", icon: "📦" },
        { label: "Total Orders",   value: stats.orders,   color: "#ff9f00", path: "/admin/orders",   icon: "🛒" },
        { label: "Total Payments", value: stats.payments, color: "#388e3c", path: "/admin/payments", icon: "💳" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", fontFamily: "sans-serif" }}>
            {/* Header */}
            <div style={{ background: "#2874f0", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
                <span style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>
                    🛡️ Smart Commerce — Admin
                </span>
                <div style={{ display: "flex", gap: 16 }}>
                    <button
                        onClick={() => navigate("/")}
                        style={{ background: "transparent", border: "1px solid #fff", color: "#fff", padding: "4px 16px", borderRadius: 2, cursor: "pointer", fontSize: 13 }}
                    >
                        View Store
                    </button>
                    <button
                        onClick={handlelogout}
                        style={{ background: "#fff", border: "none", color: "#2874f0", padding: "4px 16px", borderRadius: 2, cursor: "pointer", fontWeight: 600, fontSize: 13 }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div style={{ padding: 24 }}>
                <h4 style={{ marginBottom: 20, fontWeight: 600 }}>Dashboard Overview</h4>

                {/* Stats cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
                    {cards.map((card) => (
                        <div
                            key={card.label}
                            onClick={() => navigate(card.path)}
                            style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 4, padding: 24, cursor: "pointer", borderTop: `4px solid ${card.color}`, transition: "box-shadow .15s" }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                        >
                            <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
                            <div style={{ fontSize: 28, fontWeight: 700, color: card.color }}>{card.value}</div>
                            <div style={{ fontSize: 13, color: "#878787", marginTop: 4 }}>{card.label}</div>
                        </div>
                    ))}
                </div>

                {/* Quick nav */}
                <h5 style={{ marginBottom: 16, fontWeight: 600 }}>Quick Actions</h5>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                    {[
                        { label: "Manage Products", path: "/admin/products", bg: "#e8f0fe", color: "#2874f0" },
                        { label: "Manage Orders",   path: "/admin/orders",   bg: "#fff8e1", color: "#ff9f00" },
                        { label: "Manage Payments", path: "/admin/payments", bg: "#e8f5e9", color: "#388e3c" },
                        { label: "Add Product",     path: "/products/add",   bg: "#fce4ec", color: "#e53935" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            style={{ background: item.bg, borderRadius: 4, padding: "16px 20px", cursor: "pointer", color: item.color, fontWeight: 600, fontSize: 14 }}
                        >
                            {item.label} →
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;