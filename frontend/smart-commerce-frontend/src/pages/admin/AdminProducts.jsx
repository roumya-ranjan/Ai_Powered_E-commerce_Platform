import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { isAdmin, logout } from "../../utils/auth";

function AdminProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login");
};

    useEffect(() => {
        if (!isAdmin()) return navigate("/login");
        api.get("/api/products")
            .then((res) => setProducts(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const deleteProduct = (id) => {
        if (!window.confirm("Delete this product?")) return;
        api.delete(`/api/products/${id}`)
            .then(() => setProducts(products.filter((p) => p.id !== id)))
            .catch(() => alert("Failed to delete product"));
    };

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", fontFamily: "sans-serif" }}>
            {/* Header */}
            <div style={{ background: "#2874f0", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span onClick={() => navigate("/admin/dashboard")} style={{ color: "#fff", cursor: "pointer", fontSize: 13, opacity: .8 }}>
                        ← Dashboard
                    </span>
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>Manage Products</span>
                </div>
                <button onClick={handlelogout} style={{ background: "#fff", border: "none", color: "#2874f0", padding: "4px 16px", borderRadius: 2, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                    Logout
                </button>
            </div>

            <div style={{ padding: 24 }}>
                <div style={{ background: "#fff", borderRadius: 4, border: "0.5px solid #e0e0e0", overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                        <h5 style={{ margin: 0, fontWeight: 600 }}>All Products ({filtered.length})</h5>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <input
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ border: "1px solid #e0e0e0", borderRadius: 2, padding: "6px 12px", fontSize: 13, outline: "none", width: 220 }}
                            />
                            <button
                                onClick={() => navigate("/products/add")}
                                style={{ background: "#2874f0", color: "#fff", border: "none", padding: "7px 18px", borderRadius: 2, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                            >
                                + Add Product
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#878787" }}>Loading products...</div>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: "#f5f5f5" }}>
                                    {["ID", "Name", "Category", "Price", "Stock", "Actions"].map((h) => (
                                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#212121" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan="6" style={{ padding: 32, textAlign: "center", color: "#878787" }}>No products found</td></tr>
                                ) : filtered.map((product) => (
                                    <tr key={product.id} style={{ borderBottom: "1px solid #f0f0f0" }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
                                        onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                                    >
                                        <td style={{ padding: "12px 16px" }}>{product.id}</td>
                                        <td style={{ padding: "12px 16px", fontWeight: 500 }}>{product.name}</td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <span style={{ background: "#e8f0fe", color: "#2874f0", padding: "2px 8px", borderRadius: 2, fontSize: 11 }}>
                                                {product.category}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 16px" }}>₹{product.price?.toLocaleString()}</td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <span style={{ color: product.stockQuantity <= 5 ? "#e53935" : "#388e3c", fontWeight: 500 }}>
                                                {product.stockQuantity}
                                                {product.stockQuantity <= 5 && " ⚠️"}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <button
                                                onClick={() => navigate(`/products/${product.id}`)}
                                                style={{ background: "#e8f0fe", color: "#2874f0", border: "none", padding: "4px 12px", borderRadius: 2, fontSize: 12, cursor: "pointer", marginRight: 6 }}
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => navigate(`/products/update/${product.id}`)}
                                                style={{ background: "#fff8e1", color: "#ff9f00", border: "none", padding: "4px 12px", borderRadius: 2, fontSize: 12, cursor: "pointer", marginRight: 6 }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                style={{ background: "#fce4ec", color: "#e53935", border: "none", padding: "4px 12px", borderRadius: 2, fontSize: 12, cursor: "pointer" }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;