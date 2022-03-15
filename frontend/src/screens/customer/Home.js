import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Books from '../../components/Books';
import NewPagination from '../../components/NewPagination';
import Search from '../../components/Search';
import { getAllBooks, getAllCategories } from '../../services/bookServices';
const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  //pagination
  const [lastFetched, setLastFetched] = useState('');
  const [queryAfter, setQueryAfter] = useState('');
  const [pages, setPages] = useState();

  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { result, err, last, pages } = await getAllBooks(8, queryAfter);
      setPages(pages);
      setLastFetched(last);
      setError(err);
      setBooks(result);
      setLoading(false);
    };
    fetchBooks();
  }, [queryAfter]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { result: sBooks, err: sErr } = await getAllBooks(100, '');
      setError(sErr);
      setSearchBooks(sBooks);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { result: cat, err: catErr } = await getAllCategories();
      setError(catErr);
      setCategories(cat);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    let re = new RegExp(search, 'i');
    let searchResult = searchBooks.filter((book) => book.title.match(re));
    setBooks(searchResult.length >= 8 ? searchResult.slice(0, 8) : searchResult.length > 0 ? searchResult : [search]);
  }, [search, searchBooks]);

  const handelSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return !loading && error ? (
    <div className="container py-8 bg-white">
      <h2 className="text-6xl text-grey">Oops! it seams like an error occur please try again later </h2>
    </div>
  ) : (
    <div className="">
      <div className="container py-4 bg-hero-pattern w-full">
        <div className="lg:flex flex-row justify-between items-center py-8">
          <div className="flex flex-col justify-between items-start self-start basis-1/2">
            <h1 className="py-8 pb-2 text-5xl text-grey font-semibold">Book-House is the cheapest reading house.</h1>
            <p className="text-grey font-thin text-3xl tracking-widest pb-9">Become the best version of yourself</p>

            <Link
              to="/books/all"
              className="bg-purple text-white py-4 lg:py-6 px-9 font-bold text-lg lg:text-2xl flex flex-row justify-around"
            >
              <img src="/assets/vector.svg" className="self-center w-5 h-5" alt="" />
              <span data-testid="CTA" className="pl-5">
                Discover Books Now
              </span>
            </Link>
          </div>
          <img
            src="/assets/undraw_book_reading_kx-9-s 1.png"
            className="hidden lg:block w-1/2 h-1/3 basis-1/2"
            alt=""
          />
        </div>
      </div>
      <Search search={search} categories={categories} handelSearchChange={handelSearchChange} />
      <Books books={books} loading={loading} />
      {search === '' ? <NewPagination lastFetched={lastFetched} setQueryAfter={setQueryAfter} pages={pages} /> : ''}

      <div className="bg-purple w-full py-8 container">
        <div className="">
          <div className="flex flex-col justify-evenly">
            <h3 className="text-white text-4xl font-bold text-center py-8">Why Us?</h3>
            <div className="flex flex-col lg:flex-row justify-between items-center min-h-max pt-10">
              <div className="flex flex-col justify-evenly lg:w-1/4 text-center items-center">
                <img src="/assets/why1.svg" className="w-full lg:w-2/3 lg:h-2/3" alt="" />
                <p className="text-white">Enjoy searching our collection of the most popular books</p>
              </div>
              <div className="flex flex-col justify-evenly text-center items-center pb-16 lg:w-1/4">
                <img src="/assets/why2.svg" className="lg:w-2/3 lg:h-2/3" alt="" />
                <p className="text-white">Enjoy searching our collection of the most popular books</p>
              </div>
              <div className="flex flex-col justify-evenly text-center items-center lg:w-1/4">
                <img src="/assets/why3.svg" className="lg:w-2/3 lg:h-2/3" alt="" />
                <p className="text-white">Enjoy searching our collection of the most popular books</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
