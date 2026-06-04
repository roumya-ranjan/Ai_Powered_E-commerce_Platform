import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("/api/auth/login", loginData)
            .then((response) => {
                localStorage.setItem("token", response.data);
                alert("Login successful");
                navigate("/products");
            })
            .catch((error) => {
                console.error("Login failed:", error);
                alert("Invalid email or password");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-primary" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;