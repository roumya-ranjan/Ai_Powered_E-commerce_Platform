import { useEffect, useState } from "react";
import api from "../services/api";
import { getTokenPayload, isAdmin } from "../utils/auth";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const payload = getTokenPayload();
        
        // Admin sees all orders, user sees only their own
        const url = isAdmin() ? "/api/orders" : `/api/orders/user/${payload?.id}`;

        api.get(url)
            .then((res) => setOrders(res.data))
            .catch((err) => console.error("Error fetching orders:", err));
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            PENDING: "#ff9f00",
            CONFIRMED: "#2874f0",
            DELIVERED: "#388e3c",
            CANCELLED: "#e53935",
        };
        return colors[status] || "#878787";
    };

    return (
        <div className="container mt-4">
            <h2>Orders</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr><td colSpan="6" className="text-center">No orders found</td></tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.userId}</td>
                                <td>{order.productId}</td>
                                <td>{order.quantity}</td>
                                <td>₹{order.totalAmount?.toLocaleString()}</td>
                                <td>
                                    <span style={{
                                        background: getStatusColor(order.orderStatus),
                                        color: "#fff",
                                        padding: "2px 10px",
                                        borderRadius: 2,
                                        fontSize: 12
                                    }}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;