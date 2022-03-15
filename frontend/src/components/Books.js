import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { currencyFormatter } from '../helpers/formatter';

import Loading from './Loading';

const Books = ({ books = [], loading = true }) => {
  return (
    <div className="w-full bg-white">
      <div className="container py-8 pb-0">
        <div className="flex flex-col justify-center items-stretch py-8">
          <div className="py-4">
            <div className="container">
              <div className="sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 py-5">
                {!loading && books.length > 0 ? (
                  books[0].title ? (
                    books.map((book) => (
                      <div
                        key={book.author + book.title}
                        className="flex flex-col justify-evenly items-center bg-white pb-4 col-span-1 shadow-md w-full mx-auto my-4"
                      >
                        <div className=" h-72 w-full">
                          <Link to={`/book/${book.slug}`}>
                            <img src={book.photo} className="w-full min-h-full max-h-full" alt="book on table" />
                          </Link>
                        </div>
                        <div className=" w-fit mx-auto text-center max-w-full">
                          <Link to={`/book/${book.slug}`}>
                            <h2 className="text-grey py-3 px-2 text-center text-2xl lg:text-3xl font-semibold truncate overflow-clip max-w-full">
                              {book.title}
                            </h2>
                          </Link>
                          <p className="text-grey text-lg">By {book.author}</p>
                          <h2 className="text-grey text-2xl font-semibold py-3">{currencyFormatter(book.price)}</h2>
                          <Link
                            to={`/book/${book.slug}`}
                            className="bg-purple py-2 px-8 inline-block text-white font-semibold text-lg hover:scale-105 transition ease-in-out duration-200"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className=" text-grey p-8 text-center w-full col-span-4 text-3xl ">
                      {' '}
                      There are no books starts with {books[0]}
                    </p>
                  )
                ) : (
                  <div className="text-center w-full col-span-4 ">
                    <Loading />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Books.propTypes = {
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default Books;
