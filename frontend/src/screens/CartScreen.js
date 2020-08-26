import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import "../index.css";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li>
                <div className="cart-image">
                  <img src={item?.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      <h3>{item?.name}</h3>
                    </Link>
                  </div>
                  <div className="cart-qty-delete">
                    Qty:{item?.qty}
                    {/* <select
                      value={item?.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select> */}
                    <button
                      type="button"
                      className="button-delete"
                      onClick={() => removeFromCartHandler(item?.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">&#8377;{item?.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) : &#8377;
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>

        <button
          onClick={checkoutHandler}
          className="button full-width"
          disabled={cartItems.length === 0}
        >
          Proceed To checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
