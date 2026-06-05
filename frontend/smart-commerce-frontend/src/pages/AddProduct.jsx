import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isAdmin } from "../utils/auth";

const CATEGORIES = ["Electronics", "Fashion", "Home", "Laptops", "Sports", "Grocery", "Beauty", "Toys"];

function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "", description: "", price: "",
        stockQuantity: "", category: "", imageUrl: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Block non-admins
    if (!isAdmin()) {
        return (
            <div style={{ padding: 40, textAlign: "center" }}>
                <h4>Access Denied</h4>
                <p style={{ color: "#878787" }}>Only admins can add products.</p>
                <button onClick={() => navigate("/")} className="btn btn-primary btn-sm">Go Home</button>
            </div>
        );
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (Number(product.price) <= 0) return setError("Price must be greater than 0");
        if (Number(product.stockQuantity) < 0) return setError("Stock cannot be negative");

        setLoading(true);
        api.post("/api/products", {
            ...product,
            price: Number(product.price),
            stockQuantity: Number(product.stockQuantity),
        })
            .then(() => {
                alert("Product added successfully!");
                navigate("/admin/products");
            })
            .catch(() => setError("Failed to add product. Please try again."))
            .finally(() => setLoading(false));
    };

    const inputStyle = {
        width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0",
        borderRadius: 2, fontSize: 14, outline: "none", boxSizing: "border-box",
        marginBottom: 16
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: "#fff", padding: 32, borderRadius: 4, width: "100%", maxWidth: 500, border: "0.5px solid #e0e0e0" }}>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <span
                        onClick={() => navigate("/admin/products")}
                        style={{ color: "#2874f0", cursor: "pointer", fontSize: 13 }}
                    >
                        ← Back
                    </span>
                    <h4 style={{ margin: 0, fontWeight: 600 }}>Add New Product</h4>
                </div>

                {error && (
                    <div style={{ background: "#fdecea", color: "#e53935", fontSize: 13, padding: "10px 12px", borderRadius: 2, marginBottom: 16 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Product Name *</label>
                    <input
                        name="name" value={product.name} onChange={handleChange}
                        required placeholder="e.g. Samsung Galaxy S24"
                        style={inputStyle}
                    />

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Description</label>
                    <textarea
                        name="description" value={product.description} onChange={handleChange}
                        placeholder="Product description..."
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                    />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                            <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Price (₹) *</label>
                            <input
                                name="price" value={product.price} onChange={handleChange}
                                required type="number" min="1" placeholder="e.g. 999"
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Stock Quantity *</label>
                            <input
                                name="stockQuantity" value={product.stockQuantity} onChange={handleChange}
                                required type="number" min="0" placeholder="e.g. 50"
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Category *</label>
                    <select
                        name="category" value={product.category} onChange={handleChange}
                        required
                        style={{ ...inputStyle, background: "#fff" }}
                    >
                        <option value="">Select category</option>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Image URL</label>
                    <input
                        name="imageUrl" value={product.imageUrl} onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        style={inputStyle}
                    />

                    {/* Image preview */}
                    {product.imageUrl && (
                        <div style={{ marginBottom: 16, textAlign: "center" }}>
                            <img
                                src={product.imageUrl}
                                alt="Preview"
                                style={{ maxHeight: 120, maxWidth: "100%", objectFit: "contain", border: "1px solid #e0e0e0", borderRadius: 4, padding: 8 }}
                                onError={(e) => e.target.style.display = "none"}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: "100%", background: loading ? "#aaa" : "#2874f0", color: "#fff", border: "none", padding: "12px 0", borderRadius: 2, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;