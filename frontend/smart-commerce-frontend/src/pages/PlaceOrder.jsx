import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function PlaceOrder() {
    const navigate = useNavigate();

    const [order, setOrder] = useState({
        userId: "",
        productId: "",
        quantity: ""
    });

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("/api/orders", order)
            .then((response) => {
                alert(response.data);
                navigate("/orders");
            })
            .catch((error) => {
                console.error("Error placing order:", error);
                alert("Failed to place order");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Place Order</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    type="number"
                    name="userId"
                    placeholder="User ID"
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-2"
                    type="number"
                    name="productId"
                    placeholder="Product ID"
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-2"
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-success" type="submit">
                    Place Order
                </button>
            </form>
        </div>
    );
}

export default PlaceOrder;