import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { isAdmin, isLoggedIn } from "../utils/auth";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/api/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch(() => navigate("/products"));
    }, [id]);

    if (!product) {
        return (
            <div style={{ padding: 40, textAlign: "center", color: "#878787" }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{ background: "#f1f3f6", minHeight: "100vh", padding: 24 }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>

                {/* Breadcrumb */}
                <div style={{ fontSize: 12, color: "#878787", marginBottom: 16 }}>
                    <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "#2874f0" }}>Home</span>
                    {" › "}
                    <span onClick={() => navigate("/products")} style={{ cursor: "pointer", color: "#2874f0" }}>Products</span>
                    {" › "}
                    <span>{product.name}</span>
                </div>

                <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", display: "grid", gridTemplateColumns: "300px 1fr", gap: 0 }}>

                    {/* Image */}
                    <div style={{ padding: 32, borderRight: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                            src={product.imageUrl || `https://placehold.co/250x250?text=${encodeURIComponent(product.name)}`}
                            alt={product.name}
                            style={{ maxWidth: "100%", maxHeight: 250, objectFit: "contain" }}
                        />
                    </div>

                    {/* Details */}
                    <div style={{ padding: 32 }}>
                        <div style={{ fontSize: 11, color: "#878787", marginBottom: 8 }}>{product.category}</div>
                        <h2 style={{ fontWeight: 600, marginBottom: 8, fontSize: 22 }}>{product.name}</h2>

                        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                            <div style={{ color: "#e53935", fontSize: 12, marginBottom: 8 }}>
                                Only {product.stockQuantity} left in stock!
                            </div>
                        )}
                        {product.stockQuantity === 0 && (
                            <div style={{ color: "#e53935", fontSize: 12, marginBottom: 8 }}>
                                Out of stock
                            </div>
                        )}

                        <div style={{ fontSize: 28, fontWeight: 700, color: "#212121", marginBottom: 8 }}>
                            ₹{product.price?.toLocaleString()}
                        </div>

                        <p style={{ fontSize: 14, color: "#555", marginBottom: 24, lineHeight: 1.6 }}>
                            {product.description || "No description available."}
                        </p>

                        <div style={{ fontSize: 13, color: "#878787", marginBottom: 24 }}>
                            Stock available: <strong>{product.stockQuantity}</strong>
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: "flex", gap: 12 }}>
                            <button
                                onClick={() => {
                                    if (!isLoggedIn()) return navigate("/login");
                                    navigate(`/checkout/${product.id}`);
                                }}
                                disabled={product.stockQuantity === 0}
                                style={{
                                    background: product.stockQuantity === 0 ? "#ccc" : "#ff9f00",
                                    color: "#fff", border: "none", padding: "12px 32px",
                                    borderRadius: 2, fontWeight: 600, fontSize: 15,
                                    cursor: product.stockQuantity === 0 ? "not-allowed" : "pointer"
                                }}
                            >
                                Buy Now
                            </button>

                            {isAdmin() && (
                                <button
                                    onClick={() => navigate(`/products/update/${product.id}`)}
                                    style={{ background: "#e8f0fe", color: "#2874f0", border: "none", padding: "12px 24px", borderRadius: 2, fontWeight: 600, fontSize: 15, cursor: "pointer" }}
                                >
                                    Edit Product
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;