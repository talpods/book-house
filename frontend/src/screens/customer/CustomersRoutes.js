import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Route } from 'react-router-dom';
import Home from './Home';
import AllBooks from './AllBooks';
import Profile from './Profile';
import BookDetails from './BookDetails';
import Cart from './Cart';
import PaymentSuccess from './PaymentSuccess';
import Signin from './Signin';
import Signup from './Signup';
import Categories from './Categories';
import OrderDetails from './OrderDetails';
import ProtectedRoute from '../../components/ProtectedRoute';

const Customers = () => {
  const cart = localStorage.cart && JSON.parse(localStorage.cart);
  const [cartItemsCount, setCartItemsCount] = useState(cart ? cart.length : 0);
  return (
    <>
      <div className=" w-screen min-h-screen flex flex-col items-center overflow-x-hidden">
        <Navbar cartItemsCount={cartItemsCount} />
        <div className="w-full lg:w-cw ">
          <Route path="/" exact={true} component={Home} />
          <Route path="/books/:category" component={AllBooks} />
          <Route path="/categories" component={Categories} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/book/:title">
            <BookDetails setCartItemsCount={setCartItemsCount} />
          </Route>
          <Route path="/cart">
            <Cart setCartItemsCount={setCartItemsCount} />
          </Route>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/paymentsuccess" component={PaymentSuccess} />
          <ProtectedRoute path="/orderdetails/:order_id" component={OrderDetails} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Customers;
