import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        category: "",
        imageUrl: ""
    });

    useEffect(() => {
        api.get(`/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                alert("Product not found");
            });
    }, [id]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/api/products/${id}`, product)
            .then((response) => {
                alert(response.data);
                navigate("/products");
            })
            .catch((error) => {
                console.error("Error updating product:", error);
                alert("Failed to update product");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Update Product</h2>

            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" name="name" value={product.name} onChange={handleChange} />

                <textarea className="form-control mb-2" name="description" value={product.description} onChange={handleChange}></textarea>

                <input className="form-control mb-2" type="number" name="price" value={product.price} onChange={handleChange} />

                <input className="form-control mb-2" type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} />

                <input className="form-control mb-2" name="category" value={product.category} onChange={handleChange} />

                <input className="form-control mb-2" name="imageUrl" value={product.imageUrl} onChange={handleChange} />

                <button className="btn btn-warning" type="submit">
                    Update Product
                </button>
            </form>
        </div>
    );
}

export default UpdateProduct;