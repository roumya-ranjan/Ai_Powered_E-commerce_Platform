import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        api.post("/api/auth/login", { email, password })
            .then((res) => {
                const token = res.data.token;
                const role = res.data.role;
                if (!token){
                    setError("Invalid email or password");
                    return;
                }
                
                localStorage.setItem("token", token);

                if (role === "ADMIN"){
                    navigate("/admin/dashboard");
                }else{
                navigate("/");
                }
            })
            .catch(() => setError("Invalid email or password"));
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f3f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#fff", padding: 32, borderRadius: 4, width: 360, border: "0.5px solid #e0e0e0" }}>
                <h4 style={{ marginBottom: 4, fontWeight: 600 }}>Login</h4>
                <p style={{ fontSize: 13, color: "#878787", marginBottom: 24 }}>Welcome back to Smart Commerce</p>

                {error && (
                    <div style={{ background: "#fdecea", color: "#e53935", fontSize: 13, padding: "10px 12px", borderRadius: 2, marginBottom: 16 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: 2, fontSize: 14, outline: "none" }}
                        />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 12, color: "#878787", display: "block", marginBottom: 6 }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: 2, fontSize: 14, outline: "none" }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ width: "100%", background: "#2874f0", color: "#fff", border: "none", padding: "12px 0", borderRadius: 2, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
                    >
                        Login
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: 13, marginTop: 20, color: "#878787" }}>
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        style={{ color: "#2874f0", cursor: "pointer", fontWeight: 500 }}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;