import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
          <div className="product">
            <div className="product-image">
              <Link to={"/product/" + product._id}>
                <img src={product.image} />
              </Link>
            </div>
            <div className="product-details">
              <div className="product-name">
                <Link to={"/product/" + product._id}>
                  <h1>{product.name}</h1>
                </Link>
              </div>
              <div className="product-rating">
                <h3>{product.rating}/5.0</h3>
                <i className="fas fa-heart fa-3x"></i>
              </div>

              <div className="product-category">
                <h2>{product.category}</h2>
              </div>
              <div className="product-price">{product.price}</div>
            </div>
          </div>
          {/* 
          <div className="product">
            <Link to={"/product/" + product._id}>
              <img
                className="product-image"
                src={product.image}
                alt="product"
              />
            </Link>
            <div className="product-name">
              <Link to={"/product/" + product._id}>{product.name}</Link>
            </div>
            <div className="product-category">{product.category}</div>
            <div className="product-price">{product.price}</div>
            <div className="product-rating">
              {product.rating} Stars ({product.numReviews})
            </div>
          </div> */}
        </li>
      ))}
    </ul>
  );
}
export default HomeScreen;
