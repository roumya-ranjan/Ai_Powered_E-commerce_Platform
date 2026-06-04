import { useEffect, useState } from "react";
import api from "../services/api";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        api.get("/api/notifications")
            .then((response) => {
                setNotifications(response.data);
            })
            .catch((error) => {
                console.error("Error fetching notifications:", error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>Notifications</h2>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>

                <tbody>
                    {notifications.map((notification) => (
                        <tr key={notification.id}>
                            <td>{notification.id}</td>
                            <td>{notification.orderId}</td>
                            <td>{notification.message}</td>
                            <td>{notification.status}</td>
                            <td>{notification.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Notifications;