import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { currencyFormatter, dateFormatter } from '../helpers/formatter';

const BookItem = ({ book, setCartItemsCount }) => {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      setAdded(cart.some((or) => or.slug === book.slug));
    }
  }, [book.slug]);

  const handelAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([{ slug: book.slug, quantity: 1 }]));
    } else {
      const check = cart.filter((or) => book.slug === or.slug);
      check.length > 0
        ? cart.map((or) => (or.slug === book.slug ? or.quantity++ : null))
        : cart.push({ slug: book.slug, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    setCartItemsCount((c) => c + 1);
    setAdded(!added);
  };

  const handelRemoveToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter((or) => book.slug !== or.slug);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItemsCount((c) => c - 1);

    setAdded(!added);
  };

  return (
    <div>
      <div className="container py-4 bg-white w-full">
        <h1 className="text-center py-8 lg:text-5xl text-2xl text-grey font-semibold">
          {book.title} By {book.author}
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-stretch py-10">
          <img
            src={`${book.photo}`}
            alt="book on table"
            className="rounded-sm w-auto h-52 lg:pb-0 lg:h-48 shadow-lg "
          />
          <p className="text-grey break-all text-left text-xl w-auto pt-5 lg:pt-0 lg:pl-10 tracking-wider leading-8">
            {book.description}
          </p>
        </div>
        <div className="flex flex-col justify-between items-stretch py-10">
          <h3 className="text-grey flex-grow flex-grey capitalize py-3">
            {book.title} by: {book.author}
          </h3>
          <div className="flex flex-row justify-between items-stretch py-10">
            <div className="flex flex-col">
              <p className="text-grey">
                <strong className="text-grey">Category: </strong>
                {book.category}
              </p>
              <p className="text-grey">
                <strong className="text-grey">Publish Date: </strong>
                {dateFormatter(book.publish_date)}
              </p>
            </div>
            <h3 className="text-4xl font-bold text-grey self-center">{currencyFormatter(book.price)}</h3>
          </div>
          {added ? (
            <button
              onClick={(e) => handelRemoveToCart()}
              data-testid="cta-delete"
              className="bg-red-500 p-5 capitalize w-64 text-center place-self-center font-bold text-white shadow-lg transition ease-in-out duration-300 hover:scale-110 hover:-translate-y-2"
            >
              remove from cart
            </button>
          ) : (
            <button
              onClick={(e) => handelAddToCart()}
              data-testid="cta"
              className="bg-purple p-5 capitalize w-64 text-center place-self-center font-bold text-white shadow-lg transition ease-in-out duration-300 hover:scale-110 hover:-translate-y-2"
            >
              add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookItem;
