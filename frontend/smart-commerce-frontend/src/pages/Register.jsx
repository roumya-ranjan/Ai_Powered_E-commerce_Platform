import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        api.post("/api/auth/register", user)
            .then((res) => {
                alert(res.data);
                navigate("/login");
            })
            .catch(() => setError("Registration failed. Email may already be registered."))
            .finally(() => setLoading(false));
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#fff", padding: 32, borderRadius: 4, width: 360, border: "0.5px solid #e0e0e0" }}>
                <h4 style={{ marginBottom: 4, fontWeight: 600 }}>Create Account</h4>
                <p style={{ fontSize: 13, color: "#878787", marginBottom: 24 }}>Join Smart Commerce today</p>

                {error && (
                    <div style={{ background: "#fdecea", color: "#e53935", fontSize: 13, padding: "10px 12px", borderRadius: 2, marginBottom: 16 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Full Name</label>
                        <input
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                            style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: 2, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                        />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: 2, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                        />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            placeholder="Minimum 6 characters"
                            style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: 2, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: "100%", background: loading ? "#aaa" : "#2874f0", color: "#fff", border: "none", padding: "12px 0", borderRadius: 2, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: 13, marginTop: 20, color: "#878787" }}>
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        style={{ color: "#2874f0", cursor: "pointer", fontWeight: 500 }}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;