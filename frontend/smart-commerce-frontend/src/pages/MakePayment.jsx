import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MakePayment() {
    const navigate = useNavigate();

    const [payment, setPayment] = useState({
        orderId: "",
        amount: "",
        paymentMethod: ""
    });

    const handleChange = (e) => {
        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("/api/payments", payment)
            .then((response) => {
                alert(response.data);
                navigate("/payments");
            })
            .catch((error) => {
                console.error("Error making payment:", error);
                alert("Failed to make payment");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Make Payment</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    type="number"
                    name="orderId"
                    placeholder="Order ID"
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-2"
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                    required
                />

                <select
                    className="form-control mb-2"
                    name="paymentMethod"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Payment Method</option>
                    <option value="UPI">UPI</option>
                    <option value="CARD">CARD</option>
                    <option value="NET_BANKING">NET BANKING</option>
                    <option value="CASH">CASH</option>
                </select>

                <button className="btn btn-success" type="submit">
                    Make Payment
                </button>
            </form>
        </div>
    );
}

export default MakePayment;