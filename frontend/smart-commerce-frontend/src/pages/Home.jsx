import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isLoggedIn, isAdmin } from "../utils/auth";

function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
   const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
});
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const buyNow = (product) => {
        if (!isLoggedIn()) return navigate("/login");
        if (isAdmin()) 
            return;
        console.log(product);

        sessionStorage.setItem("buyProduct", JSON.stringify(product));
        sessionStorage.setItem("buyQuantity", "1");
        console.log(sessionStorage.getItem("buyProduct"));
        navigate("/address");
    };

    const addToCart = (product) => {
    if (!isLoggedIn()) return navigate("/login");
    if (isAdmin()) return;

    // ALWAYS read fresh from localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = currentCart.findIndex(
       (item)=> item.id === product.id
    );

    if (existingIndex >= 0) {
        currentCart[existingIndex].quantity += 1;
    } else {
        currentCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            stockQuantity: product.stockQuantity,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    setCart(currentCart);

    const total = currentCart.reduce((sum, i) => sum + i.quantity, 0);
    alert(`✅ ${product.name} added! Cart: ${currentCart.length} products, ${total} items total`);
};

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category?.toLowerCase().includes(search.toLowerCase())
    );

    const categories = ["Electronics", "Fashion", "Home", "Laptops", "Sports", "Grocery", "Beauty", "Toys"];

    return (
        <div style={{ background: "#f1f3f6", minHeight: "100vh", fontFamily: "sans-serif" }}>
            <div style={{ background: "#fff", borderBottom: "1px solid #e0e0e0", display: "flex", padding: "0 8px", overflowX: "auto" }}>
                <div onClick={() => setSearch("")} style={{ padding: "12px 16px", fontSize: 12, fontWeight: 500, color: "#2874f0", cursor: "pointer", whiteSpace: "nowrap", borderBottom: "2px solid #2874f0" }}>
                    All
                </div>
                {categories.map((cat) => (
                    <div key={cat} onClick={() => setSearch(cat)} style={{ padding: "12px 16px", fontSize: 12, fontWeight: 500, color: "#212121", cursor: "pointer", whiteSpace: "nowrap", borderBottom: "2px solid transparent" }}>
                        {cat}
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: 12, padding: 12 }}>
                <div style={{ width: 200, flexShrink: 0, background: "#fff", border: "0.5px solid #e0e0e0", padding: 16, borderRadius: 2, height: "fit-content" }}>
                    <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #f0f0f0" }}>Filters</h4>
                    {["Under ₹500", "₹500–₹2000", "₹2000–₹10000", "Above ₹10000"].map((label) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", cursor: "pointer" }}>
                            <input type="checkbox" style={{ accentColor: "#2874f0" }} />
                            <span style={{ fontSize: 12 }}>{label}</span>
                        </div>
                    ))}
                    <h4 style={{ fontSize: 13, fontWeight: 600, margin: "16px 0 8px", paddingBottom: 8, borderBottom: "1px solid #f0f0f0" }}>Rating</h4>
                    {["4★ & above", "3★ & above"].map((r) => (
                        <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", cursor: "pointer" }}>
                            <input type="checkbox" style={{ accentColor: "#2874f0" }} />
                            <span style={{ fontSize: 12 }}>{r}</span>
                        </div>
                    ))}
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ background: "#ff9f00", borderRadius: 4, padding: "10px 16px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>🔥 Best Deals</span>
                        <span style={{ background: "#fff", color: "#ff9f00", borderRadius: 2, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>{filtered.length} products</span>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: 40, color: "#878787" }}>Loading products...</div>
                    ) : filtered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: 40, color: "#878787" }}>No products found.</div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 200px))", justifyContent: "start", gap: 1, background: "#e0e0e0", border: "1px solid #e0e0e0", borderRadius: 2, overflow: "hidden" }}>
                            {filtered.map((product) => (
                                <div key={product.id} style={{ background: "#fff", padding: 14, cursor: "pointer", position: "relative" }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.12)"}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                                >
                                    <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                                        <img
                                            src={product.imageUrl || `https://placehold.co/120x120?text=${encodeURIComponent(product.name)}`}
                                            alt={product.name}
                                            style={{ maxHeight: 120, maxWidth: "100%", objectFit: "contain" }}
                                        />
                                    </div>
                                    <div style={{ fontSize: 11, color: "#878787", marginBottom: 4 }}>{product.category}</div>
                                    <div style={{ fontSize: 13, fontWeight: 500, color: "#212121", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={product.name}>
                                        {product.name}
                                    </div>
                                    {product.stockQuantity <= 5 && (
                                        <div style={{ fontSize: 10, color: "#e53935", marginBottom: 4 }}>Only {product.stockQuantity} left!</div>
                                    )}
                                    <div style={{ fontSize: 16, fontWeight: 600, color: "#212121", marginBottom: 8 }}>
                                        ₹{product.price?.toLocaleString()}
                                    </div>

                                    {!isAdmin() && (
                                        <div style={{ display: "flex", gap: 6 }}>
                                            <button type="button" onClick={(e) => {e.stopPropagation();
                                                buyNow(product)
                                            }}
                                                style={{ flex: 1, background: "#ff9f00", border: "none", color: "#fff", fontSize: 12, fontWeight: 600, padding: "6px 0", borderRadius: 2, cursor: "pointer" }}>
                                                Buy Now
                                            </button>
                                            <button onClick={() => addToCart(product)}
                                                style={{ flex: 1, background: "#fff", border: "1px solid #2874f0", color: "#2874f0", fontSize: 12, fontWeight: 600, padding: "6px 0", borderRadius: 2, cursor: "pointer" }}>
                                                Add to Cart
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Home;