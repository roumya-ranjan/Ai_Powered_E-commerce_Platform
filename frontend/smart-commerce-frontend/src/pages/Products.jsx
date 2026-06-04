import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/api/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const deleteProduct = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        api.delete(`/api/products/${id}`)
            .then((response) => {

                alert(response.data);

                setProducts(
                    products.filter(product => product.id !== id)
                );
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
                alert("Failed to delete product");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Products</h2>

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
                            <td>₹{product.price}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.category}</td>
                            <td>
                                <Link
                                    className="btn btn-primary btn-sm"
                                    to={`/products/${product.id}`}
                                >
                                    View
                                </Link>

                                <Link
                                    className="btn btn-warning btn-sm ms-2"
                                     to={`/products/update/${product.id}`}
                                 >
                                     Edit
                                 </Link>
                                 <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={()=>deleteProduct(product.id)}
                                 >
                                        Delete
                                 </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Products;