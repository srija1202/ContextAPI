// ProductList.js
import React from 'react';
import { useProductContext } from './ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css'; // Import custom CSS
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductList = () => {
    const { products, increaseQuantity, decreaseQuantity, removeProduct } = useProductContext();

    const renderRating = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => <FaStar key={i} />)}
                {halfStar && <FaStarHalfAlt />}
                {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i} />)}
            </>
        );
    };

    return (
        <div className="container">
            {products.map(product => {
                const discountAmount = (product.price * product.discountPercentage / 100).toFixed(2);
                const finalPrice = (product.price - discountAmount).toFixed(2);
                const totalAmount = (product.quantity * finalPrice).toFixed(2);

                return (
                    <div className="card mb-4" key={product.id}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={product.thumbnail} className="card-img" alt={product.title} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                            <p className="card-text text-success"><strong>Discount Offer:</strong> {product.discountPercentage}%</p>
                                        </div>
                                    </div>
                                    <p className="card-text text-center">{product.description}</p>
                                    <div className="d-flex justify-content-between">
                                        <p className="card-text"><strong>In Stock:</strong> {product.stock}</p>
                                        <p className="card-text"><strong>Rating:</strong> {renderRating(product.rating)}</p>
                                    </div>
                                    <div className="d-flex justify-content-end mb-3">
                                        <button className="btn btn-danger" onClick={() => removeProduct(product.id)}>Remove</button>
                                        <div className="btn-group ml-2 quantity-controls">
                                            <button className="btn btn-outline-secondary" onClick={() => decreaseQuantity(product.id)}>-</button>
                                            <span className="btn btn-outline-secondary">{product.quantity}</span>
                                            <button className="btn btn-outline-secondary" onClick={() => increaseQuantity(product.id)}>+</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <p className="card-text"><strong>Original Price (1 item):</strong> ${product.price}</p>
                                        <p className="card-text"><strong>Discount Amount:</strong> - ${discountAmount}</p>
                                        <p className="card-text"><strong>Final Price:</strong> ${finalPrice}</p>
                                        <p className="card-text"><strong>Total Amount:</strong> ${totalAmount}</p>
                                    </div>
                                    <button className="btn btn-primary">Pay Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
