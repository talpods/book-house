import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItemList from '../../components/CartItemList';
import Loading from '../../components/Loading';
import Paypal from '../../components/Paypal';
import Shipping from '../../components/Shipping';
import { currencyFormatter } from '../../helpers/formatter';
import { GetCartItems } from '../../services/CartServices';

const Cart = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || null;

  const subtotal = () => {
    let subtotal = 0;
    if (cart.length === 0) return 0;
    cart.forEach((i) => {
      subtotal += i.quantity * i.price;
    });
    return subtotal;
  };

  // localStorage.cart = JSON.stringify([
  //   { id: 1, quantity: 2 },
  //   { id: 3, quantity: 4 },
  // ]);

  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState();
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.cart) {
      setCartLoading(false);
      return;
    }
    const storedCart = JSON.parse(localStorage.cart);
    if (storedCart.length === 0) {
      setCartLoading(false);
      return;
    }

    GetCartItems(storedCart).then((data) => {
      setCart(
        data.map((b) => ({
          slug: b.slug,
          title: b.title,
          photo: b.photo,
          author: b.author,
          quantity: storedCart.find((bo) => bo.slug === b.slug).quantity,
          price: b.price,
          inStock: b.quantity,
        })),
      );
      console.log(cartLoading);
      setCartLoading(false);
    });

    return () => {
      setCart({}); //  cleanup memory
    };
  }, []);

  const deleteBook = (slug) => {
    let products = cart.filter((p) => p.slug !== slug);
    setCart(products);

    products = JSON.parse(localStorage.cart).filter((p) => p.slug !== slug);
    localStorage.cart = JSON.stringify(products);
    props.setCartItemsCount((c) => c - 1);
  };
  const changeQuantity = (slug, quantity) => {
    let products = cart.map((p) => {
      if (p.slug === slug) p.quantity = quantity;
      return p;
    });
    setCart(products);

    products = JSON.parse(localStorage.cart);

    localStorage.cart = JSON.stringify(
      products.map((p) => {
        if (p.slug === slug) p.quantity = quantity;
        return p;
      }),
    );
  };

  return (
    <main className="bg-purple text-white p-10">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-10">Shipping Cart</h1>
        {cartLoading ? (
          <Loading />
        ) : (
          <CartItemList
            products={cart}
            deleteBook={deleteBook}
            changeQuantity={changeQuantity}
            currencyFormatter={currencyFormatter}
          />
        )}

        <p className="my-5 text-xl font-bold" data-testid={`${currencyFormatter(subtotal())}`}>
          Subtotal({cart && cart.length} items) : {currencyFormatter(subtotal())}
        </p>

        {userData && cart.length > 0 && <Shipping setShipping={setShipping} />}

        {userData ? (
          <Paypal
            shipping={shipping}
            items={cart.map((e) => {
              return { sk: `books#${e.slug}`, quantity: e.quantity };
            })}
            setCartItemsCount={props.setCartItemsCount}
          />
        ) : (
          <Link to={'/signin/order'} className="px-4 py-2 rounded-sm bg-white text-black font-semibold">
            Sign in and checkout
          </Link>
        )}
      </div>
    </main>
  );
};

export default Cart;
