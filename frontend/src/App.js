import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import "./App.css";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen  from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">BookStore</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">
              <i className="fas fa-shopping-cart fa-1.5x" />
            </Link>
            {userInfo ? (
              <>
                <Link to="/profile">
                  {userInfo.name && (
                    <>
                      <i className="fas fa-user-alt fa-1.5x" />
                    </>
                  )}
                </Link>
              </>
            ) : (
              <Link to="/signin">SignIn</Link>
            )}
             {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <aside className="sidebar">
          <h3 className="sidebar-heading">Books Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            X
          </button>
          <ul>
            <li>Action</li>
            <li>Adventure</li>
            <li>Comics</li>
            <li>Love Stories</li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">

            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </div>
        </main>
        <footer className="footer">All Rights Reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
