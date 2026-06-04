import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("/api/auth/register", user)
            .then((response) => {
                alert(response.data);
                navigate("/login");
            })
            .catch((error) => {
                console.error("Registration failed:", error);
                alert("Registration failed");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />

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

                <button className="btn btn-success" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;