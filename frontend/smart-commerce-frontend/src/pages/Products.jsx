import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { isAdmin } from "../utils/auth";

function Products() {
    const [products, setProducts] = useState([]);
    const admin = isAdmin();

    useEffect(() => {
        api.get("/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    const deleteProduct = (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        api.delete(`/api/products/${id}`)
            .then((res) => {
                alert(res.data);
                setProducts(products.filter((p) => p.id !== id));
            })
            .catch(() => alert("Failed to delete product"));
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Products</h2>
                {admin && (
                    <Link className="btn btn-primary btn-sm" to="/products/add">
                        + Add Product
                    </Link>
                )}
            </div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>₹{product.price?.toLocaleString()}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.category}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm" to={`/products/${product.id}`}>
                                    View
                                </Link>
                                {admin && (
                                    <>
                                        <Link className="btn btn-warning btn-sm ms-2" to={`/products/update/${product.id}`}>
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Products;