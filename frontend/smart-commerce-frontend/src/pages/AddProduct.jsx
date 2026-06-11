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
    const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
    const [previewUrl, setPreviewUrl] = useState("");

    if (!isAdmin()) {
        return (
            <div style={{ padding: 40, textAlign: "center" }}>
                <h4>Access Denied</h4>
                <button onClick={() => navigate("/")} className="btn btn-primary btn-sm">Go Home</button>
            </div>
        );
    }

    const handleChange = (e) => {
        const updated = { ...product, [e.target.name]: e.target.value };
        setProduct(updated);
        if (e.target.name === "imageUrl") {
            setPreviewUrl(e.target.value);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Convert to base64 for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
            setProduct(prev => ({ ...prev, imageUrl: reader.result }));
        };
        reader.readAsDataURL(file);
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
        borderRadius: 2, fontSize: 14, outline: "none",
        boxSizing: "border-box", marginBottom: 16
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: "#fff", padding: 32, borderRadius: 4, width: "100%", maxWidth: 500, border: "0.5px solid #e0e0e0" }}>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <span onClick={() => navigate("/admin/products")} style={{ color: "#2874f0", cursor: "pointer", fontSize: 13 }}>← Back</span>
                    <h4 style={{ margin: 0, fontWeight: 600 }}>Add New Product</h4>
                </div>

                {error && (
                    <div style={{ background: "#fdecea", color: "#e53935", fontSize: 13, padding: "10px 12px", borderRadius: 2, marginBottom: 16 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Product Name *</label>
                    <input name="name" value={product.name} onChange={handleChange} required placeholder="e.g. Samsung Galaxy S24" style={inputStyle} />

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Description</label>
                    <textarea name="description" value={product.description} onChange={handleChange} placeholder="Product description..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                            <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Price (₹) *</label>
                            <input name="price" value={product.price} onChange={handleChange} required type="number" min="1" placeholder="e.g. 999" style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Stock Quantity *</label>
                            <input name="stockQuantity" value={product.stockQuantity} onChange={handleChange} required type="number" min="0" placeholder="e.g. 50" style={inputStyle} />
                        </div>
                    </div>

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Category *</label>
                    <select name="category" value={product.category} onChange={handleChange} required style={{ ...inputStyle, background: "#fff" }}>
                        <option value="">Select category</option>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>

                    {/* Image section */}
                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 8 }}>Product Image</label>

                    {/* Toggle URL / Upload */}
                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        <button type="button"
                            onClick={() => setImageMode("url")}
                            style={{ flex: 1, padding: "8px 0", borderRadius: 2, border: "1px solid #2874f0", background: imageMode === "url" ? "#2874f0" : "#fff", color: imageMode === "url" ? "#fff" : "#2874f0", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
                            Paste URL
                        </button>
                        <button type="button"
                            onClick={() => setImageMode("upload")}
                            style={{ flex: 1, padding: "8px 0", borderRadius: 2, border: "1px solid #2874f0", background: imageMode === "upload" ? "#2874f0" : "#fff", color: imageMode === "upload" ? "#fff" : "#2874f0", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
                            Upload Image
                        </button>
                    </div>

                    {imageMode === "url" ? (
                        <input
                            name="imageUrl"
                            value={product.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            style={inputStyle}
                        />
                    ) : (
                        <div style={{ marginBottom: 16 }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ width: "100%", padding: "8px 0", fontSize: 14 }}
                            />
                        </div>
                    )}

                    {/* Image preview */}
                    {previewUrl && (
                        <div style={{ marginBottom: 16, textAlign: "center", padding: 12, border: "1px solid #e0e0e0", borderRadius: 4 }}>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{ maxHeight: 150, maxWidth: "100%", objectFit: "contain" }}
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    setError("Invalid image URL");
                                }}
                            />
                            <div style={{ fontSize: 12, color: "#388e3c", marginTop: 8 }}>✅ Image preview</div>
                        </div>
                    )}

                    {/* No image placeholder */}
                    {!previewUrl && (
                        <div style={{ marginBottom: 16, textAlign: "center", padding: 24, border: "2px dashed #e0e0e0", borderRadius: 4, color: "#878787", fontSize: 13 }}>
                            📷 No image selected — placeholder will be shown
                        </div>
                    )}

                    <button type="submit" disabled={loading}
                        style={{ width: "100%", background: loading ? "#aaa" : "#2874f0", color: "#fff", border: "none", padding: "12px 0", borderRadius: 2, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;