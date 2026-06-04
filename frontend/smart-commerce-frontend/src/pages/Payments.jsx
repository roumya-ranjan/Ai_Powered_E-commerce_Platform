import { useEffect, useState } from "react";
import api from "../services/api";

function Payments() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        api.get("/api/payments")
            .then((response) => {
                setPayments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching payments:", error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>Payments</h2>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.orderId}</td>
                            <td>₹{payment.amount}</td>
                            <td>{payment.paymentMethod}</td>
                            <td>{payment.paymentStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Payments;