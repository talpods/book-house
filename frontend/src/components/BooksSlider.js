import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { currencyFormatter } from '../helpers/formatter';
import Loading from './Loading';

const BooksSlider = ({ books = [], loading = true, slug }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexMobile, setCurrentIndexMobile] = useState(0);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [displayedBooksMobile, setDisplayedBooksMobile] = useState([]);

  useEffect(() => {
    setDisplayedBooks(
      books.length > 0 && !loading ? books.filter((b) => b.slug !== slug).slice(currentIndex, currentIndex + 3) : [],
    );
  }, [currentIndex, books, loading, slug]);
  useEffect(() => {
    setDisplayedBooksMobile(
      books.length > 0 && !loading
        ? books.filter((b) => b.slug !== slug).slice(currentIndexMobile, currentIndexMobile + 1)
        : [],
    );
  }, [currentIndexMobile, books, loading, slug]);
  const handelPrevClick = () => {
    setCurrentIndex(currentIndex - 1);
  };
  const handelNextClick = () => {
    setCurrentIndex(currentIndex + 1);
  };
  return (
    <div>
      <div className="bg-purple py-4 container hidden lg:block">
        <h2 className="text-white text-5xl text-center font-semibold my-5"> Related books</h2>
        <div className="">
          <div className="lg:flex flex-row justify-between items-center py-5 transition ease-in-out duration-500">
            <button
              data-testid="prev"
              className={
                currentIndex === 0
                  ? 'first:ml-0 text-md font-semibold flex w-8 h-8 mx-1 p-0 rounded-md items-center justify-center cursor-not-allowed leading-tight relative border border-lightGrey  bg-gray-400'
                  : 'first:ml-0 text-md font-semibold flex w-8 h-8 mx-1 p-0 rounded-md items-center justify-center leading-tight relative border  border-lightGrey bg-white cursor-pointer'
              }
              disabled={currentIndex === 0 ? true : false}
              onClick={handelPrevClick}
            >
              <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0879 2.2625L4.36289 8L10.0879 13.7375L8.32539 15.5L0.825391 8L8.32539 0.5L10.0879 2.2625Z"
                  fill="#C4CDD5"
                />
              </svg>
            </button>
            {books.length > 0 && !loading ? (
              displayedBooks.map((book) => (
                <div
                  key={book.author + book.title}
                  className="flex flex-col justify-around items-center bg-white pb-4 shadow-sm lg:w-72 w-fit mx-auto lg:mx-4 my-4"
                >
                  <div className="h-72 w-full">
                    <Link to={`/book/${book.slug}`}>
                      <img src={book.photo} className="w-full min-h-full max-h-full" alt="book on table" />
                    </Link>
                  </div>
                  <h2 className="text-grey py-3 text-lg lg:text-xl truncate overflow-clip max-w-full font-semibold">
                    {book.title}
                  </h2>
                  <p className="text-grey text-lg">By {book.author}</p>
                  <h2 className="text-grey text-2xl font-semibold py-3">{currencyFormatter(book.price)}</h2>
                  <button className="bg-purple py-2 px-8 text-white font-semibold text-lg">
                    <Link to={`/book/${book.slug}`}>Read More</Link>{' '}
                  </button>
                </div>
              ))
            ) : (
              <Loading />
            )}
            <button
              data-testid="next"
              className={
                currentIndex === books.length - 2
                  ? 'first:ml-0 text-md font-semibold flex w-8 h-8 mx-1 p-0 rounded-md items-center justify-center cursor-not-allowed leading-tight relative border border-lightGrey  bg-gray-400'
                  : 'first:ml-0 text-md font-semibold flex w-8 h-8 mx-1 p-0 rounded-md items-center justify-center leading-tight relative border  border-lightGrey bg-white cursor-pointer'
              }
              disabled={currentIndex === books.length - 2 ? true : false}
              onClick={handelNextClick}
            >
              <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.800781 2.2625L6.52578 8L0.800781 13.7375L2.56328 15.5L10.0633 8L2.56328 0.5L0.800781 2.2625Z"
                  fill="#C4CDD5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-purple py-4 container block lg:hidden">
        <h2 className="text-white text-5xl text-center font-semibold my-5"> Related books</h2>
        <div className="w-full">
          <div className="flex flex-row justify-between items-center py-5 transition w-full ease-in-out duration-500">
            <button
              data-testid="prevMobile"
              className={
                currentIndexMobile === 0
                  ? 'first:ml-0 text-md font-semibold flex w-8 h-8 mx-1 p-0 rounded-md items-center justify-center cursor-not-allowed leading-tight relative border border-lightGrey  bg-gray-400'
                  : 'first:ml-0 text-md font-semibold flex w-8 h-8 mx-1 p-0 rounded-md items-center justify-center leading-tight relative border  border-lightGrey bg-white cursor-pointer'
              }
              disabled={currentIndexMobile === 0 ? true : false}
              onClick={() => setCurrentIndexMobile(currentIndexMobile - 1)}
            >
              <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0879 2.2625L4.36289 8L10.0879 13.7375L8.32539 15.5L0.825391 8L8.32539 0.5L10.0879 2.2625Z"
                  fill="#C4CDD5"
                />
              </svg>
            </button>
            {books.length > 0 && !loading ? (
              displayedBooksMobile.map((book) => (
                <div
                  key={book.author + book.title}
                  className="flex flex-col justify-around items-center bg-white pb-4 shadow-sm lg:w-72 w-4/5 mx-auto lg:mx-4 my-4"
                >
                  <div className="h-72 w-full">
                    <Link to={`/book/${book.slug}`}>
                      <img src={book.photo} className="w-full min-h-full max-h-full" alt="book on table" />
                    </Link>
                  </div>
                  <h2 className="text-grey py-3 text-lg lg:text-xl truncate overflow-clip max-w-full font-semibold px-2">
                    {book.title}
                  </h2>
                  <p className="text-grey text-lg">By {book.author}</p>
                  <h2 className="text-grey text-2xl font-semibold py-3">{currencyFormatter(book.price)}</h2>
                  <button className="bg-purple py-2 px-8 text-white font-semibold text-lg">
                    <Link to={`/book/${book.slug}`}>Read More</Link>
                  </button>
                </div>
              ))
            ) : (
              <p>Loading</p>
            )}
            <button
              data-testid="nextMobile"
              className={
                currentIndexMobile === books.length - 2
                  ? 'first:ml-0 text-md font-semibold flex w-8 h-8 mx-1 p-0 rounded-md items-center justify-center cursor-not-allowed leading-tight relative border border-lightGrey  bg-gray-400'
                  : 'first:ml-0 text-md font-semibold flex w-8 h-8 mx-1 p-0 rounded-md items-center justify-center leading-tight relative border  border-lightGrey bg-white cursor-pointer'
              }
              disabled={currentIndexMobile === books.length - 2 ? true : false}
              onClick={() => setCurrentIndexMobile(currentIndexMobile + 1)}
            >
              <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.800781 2.2625L6.52578 8L0.800781 13.7375L2.56328 15.5L10.0633 8L2.56328 0.5L0.800781 2.2625Z"
                  fill="#C4CDD5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

BooksSlider.propTypes = {
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default BooksSlider;
