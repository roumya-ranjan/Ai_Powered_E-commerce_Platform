import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
    const navigate = useNavigate();

    // Read from sessionStorage instead of location.state
    const [product] = useState(() => {
        const saved = sessionStorage.getItem("buyProduct");
        console.log("Saved Product:", saved);
        return saved ? JSON.parse(saved) : null;
    });
    const [quantity, setQuantity] = useState(() => {
        return Number(sessionStorage.getItem("buyQuantity")) || 1;
    });

    const [address, setAddress] = useState({
        fullName: "", phone: "", street: "",
        city: "", state: "", pincode: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
    if (!product) {
        navigate("/");
    }
    }, [product, navigate]);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!address.fullName || !address.phone || !address.street ||
            !address.city || !address.state || !address.pincode) {
            setError("Please fill all fields");
            return;
        }
        if (address.phone.length !== 10) {
            setError("Phone must be 10 digits");
            return;
        }
        if (address.pincode.length !== 6) {
            setError("Pincode must be 6 digits");
            return;
        }

        // Save address and go to payment
        sessionStorage.setItem("deliveryAddress", JSON.stringify(address));
        sessionStorage.setItem("buyQuantity", String(quantity));
        navigate("/Payment");
    };

    if (!product) {
    return (
        <div style={{ padding: "30px" }}>
            Product not found.
        </div>
    );
}

    const inputStyle = {
        width: "100%", padding: "10px 12px",
        border: "1px solid #e0e0e0", borderRadius: 2,
        fontSize: 14, outline: "none",
        boxSizing: "border-box", marginBottom: 16
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", padding: 24 }}>
            <div style={{ maxWidth: 500, margin: "0 auto", background: "#fff", padding: 32, borderRadius: 4, border: "0.5px solid #e0e0e0" }}>

                {/* Product + quantity summary */}
                <div style={{ background: "#e8f0fe", borderRadius: 4, padding: "16px", marginBottom: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>
                        {product.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontSize: 13, color: "#878787" }}>Quantity:</span>
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid #2874f0", borderRadius: 2, background: "#fff" }}>
                            <button
                                type="button"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: "#2874f0" }}>
                                −
                            </button>
                            <span style={{ width: 44, textAlign: "center", fontSize: 15, fontWeight: 600 }}>
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQuantity(q => q + 1)}
                                style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: "#2874f0" }}>
                                +
                            </button>
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#2874f0" }}>
                            ₹{(product.price * quantity).toLocaleString()}
                        </span>
                    </div>
                </div>

                <h4 style={{ fontWeight: 600, marginBottom: 20 }}>📦 Delivery Address</h4>

                {error && (
                    <div style={{ background: "#fdecea", color: "#e53935", fontSize: 13, padding: "10px 12px", borderRadius: 2, marginBottom: 16 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Full Name *</label>
                    <input name="fullName" value={address.fullName} onChange={handleChange}
                        placeholder="Enter full name" style={inputStyle} />

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Phone Number *</label>
                    <input name="phone" value={address.phone} onChange={handleChange}
                        placeholder="10 digit mobile number" maxLength={10} style={inputStyle} />

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Street Address *</label>
                    <input name="street" value={address.street} onChange={handleChange}
                        placeholder="House no, Street, Area" style={inputStyle} />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                            <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>City *</label>
                            <input name="city" value={address.city} onChange={handleChange}
                                placeholder="City" style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>State *</label>
                            <input name="state" value={address.state} onChange={handleChange}
                                placeholder="State" style={inputStyle} />
                        </div>
                    </div>

                    <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Pincode *</label>
                    <input name="pincode" value={address.pincode} onChange={handleChange}
                        placeholder="6 digit pincode" maxLength={6} style={inputStyle} />

                    <button type="submit"
                        style={{ width: "100%", background: "#ff9f00", color: "#fff", border: "none", padding: "14px 0", borderRadius: 2, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                        Continue to Payment →
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Address;