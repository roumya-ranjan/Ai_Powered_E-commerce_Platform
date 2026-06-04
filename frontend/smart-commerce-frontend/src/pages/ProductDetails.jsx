import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    if (!product) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="container mt-4">
            <h2>{product.name}</h2>

            <div className="card p-3">
                <p><strong>ID:</strong> {product.id}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Stock:</strong> {product.stockQuantity}</p>
                <p><strong>Description:</strong> {product.description}</p>
            </div>
        </div>
    );
}

export default ProductDetails;