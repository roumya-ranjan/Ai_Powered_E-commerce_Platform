import { useEffect, useState } from "react";
import api from "../services/api";
import { getTokenPayload, isAdmin, isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn()) return navigate("/login");

        const payload = getTokenPayload();
        const url = isAdmin() ? "/api/notifications" : `/api/notifications/user/${payload?.id}`;

        api.get(url)
            .then((res) => setNotifications(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    };

    const statusColor = { SENT: "#388e3c", PENDING: "#ff9f00", FAILED: "#e53935" };

    return (
        <div style={{ background: "#f1f3f6", minHeight: "100vh", padding: 24 }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>

                <h4 style={{ fontWeight: 600, marginBottom: 20 }}>
                    🔔 {isAdmin() ? "All Notifications" : "My Notifications"}
                </h4>

                <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", overflow: "hidden" }}>
                    {loading ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#878787" }}>Loading...</div>
                    ) : notifications.length === 0 ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#878787" }}>No notifications yet.</div>
                    ) : (
                        <div>
                            {notifications.map((n, index) => (
                                <div
                                    key={n.id}
                                    style={{
                                        padding: "16px 20px",
                                        borderBottom: index < notifications.length - 1 ? "1px solid #f0f0f0" : "none",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        gap: 16
                                    }}
                                >
                                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                        <div style={{ fontSize: 20, marginTop: 2 }}>📦</div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 500, color: "#212121", marginBottom: 4 }}>
                                                {n.message}
                                            </div>
                                            <div style={{ fontSize: 12, color: "#878787" }}>
                                                Order #{n.orderId} · {formatDate(n.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{
                                        background: statusColor[n.status] || "#878787",
                                        color: "#fff", padding: "2px 10px",
                                        borderRadius: 2, fontSize: 11,
                                        whiteSpace: "nowrap", flexShrink: 0
                                    }}>
                                        {n.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notifications;