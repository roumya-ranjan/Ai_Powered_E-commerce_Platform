import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddProduct() {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        category: "",
        imageUrl: ""
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("/api/products", product)
            .then(() => {
                alert("Product added successfully");
                navigate("/products");
            })
            .catch((error) => {
                console.error("Error adding product:", error);
                alert("Failed to add product");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" name="name" placeholder="Product Name" onChange={handleChange} />

                <textarea className="form-control mb-2" name="description" placeholder="Description" onChange={handleChange}></textarea>

                <input className="form-control mb-2" name="price" placeholder="Price" type="number" onChange={handleChange} />

                <input className="form-control mb-2" name="stockQuantity" placeholder="Stock Quantity" type="number" onChange={handleChange} />

                <input className="form-control mb-2" name="category" placeholder="Category" onChange={handleChange} />

                <input className="form-control mb-2" name="imageUrl" placeholder="Image URL" onChange={handleChange} />

                <button className="btn btn-success" type="submit">
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProduct;