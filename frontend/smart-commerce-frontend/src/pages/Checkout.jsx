import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { getTokenPayload } from "../utils/auth";

function Checkout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        api.get(`/api/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch(() => alert("Product not found"));
    }, [id]);

    const placeOrder = () => {
        const payload = getTokenPayload();
        if (!payload) return navigate("/login");

        api.post("/api/orders", {
            userId: payload.id,        // ← from JWT, not hardcoded
            productId: product.id,
            quantity: Number(quantity),
        })
        .then(() => {
            alert("Order placed successfully!");
            navigate("/orders");
        })
        .catch(() => alert("Order failed. Please try again."));
    };

    if (!product) return <h3 className="container mt-4">Loading...</h3>;

    return (
        <div className="container mt-4" style={{ maxWidth: 500 }}>
            <h2>Checkout</h2>
            <div className="card p-4">
                <h4>{product.name}</h4>
                <p className="text-muted">{product.description}</p>
                <h5 className="text-success">₹{product.price?.toLocaleString()}</h5>

                <label className="form-label mt-3">Quantity</label>
                <input
                    className="form-control mb-3"
                    type="number"
                    value={quantity}
                    min="1"
                    max={product.stockQuantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <p><strong>Total: ₹{(product.price * quantity).toLocaleString()}</strong></p>

                <button className="btn btn-success w-100" onClick={placeOrder}>
                    Confirm Order
                </button>
            </div>
        </div>
    );
}

export default Checkout;