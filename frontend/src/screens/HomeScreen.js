import React from 'react';
import {Link} from 'react-router-dom';
import data from '../data';
function HomeScreen(props){
    return <ul className="products">
                {
                    data.products.map(product => 
                        <li key={product._id}>
                        <div className="product">
                            <Link to={"/product/"+product._id}>
                            <img className="product-image" src={product.image} alt="product" />
                            </Link>
                            <div className="product-name">
                                <Link to={"/product/"+product._id}>{product.name}</Link>
                            </div>
                            <div className="product-category">{product.category}</div>
                            <div className="product-price">{product.price}</div>
                            <div className="product-rating">{product.rating} Stars ({product.numReviews})</div>
                        </div>
                    </li>    
                )
                }
            </ul>
}
export default HomeScreen;