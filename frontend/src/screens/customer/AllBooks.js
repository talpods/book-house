import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Books from '../../components/Books';
import NewPagination from '../../components/NewPagination';
import Search from '../../components/Search';

import { getAllBooks, getBooksByCategory, getAllCategories } from '../../services/bookServices';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { category } = useParams();

  // pagination
  const [lastFetched, setLastFetched] = useState('');
  const [queryAfter, setQueryAfter] = useState('');
  const [pages, setPages] = useState(0);

  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setError();
      setLoading(true);
      const { result: sBooks, err: sErr } = await getAllBooks(100, '');
      if (!category || category === 'all') {
        const { result, err, last, pages } = await getAllBooks(8, queryAfter);
        setError((e) => (!e ? err : e));
        setPages(pages);
        setLastFetched(last);
        setBooks(result);
      } else {
        const { similar, err } = await getBooksByCategory(category);
        setError((e) => (!e ? err : e));
        setBooks(similar);
        setCategoryBooks(similar);
      }
      setError((e) => (!e ? sErr : e));
      setSearchBooks(sBooks);
      setLoading(false);
    };
    fetchBooks();
  }, [queryAfter, category]);

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
    if (search !== '') {
      if (!category || category === 'all') {
        let re = new RegExp(search, 'i');
        let searchResult = searchBooks.filter((book) => book.title.match(re));
        setBooks(
          searchResult.length > 8 ? searchResult.slice(0, 8) : searchResult.length > 0 ? searchResult : [search],
        );
      } else {
        setBooks(categoryBooks);
      }
    }
  }, [search, category, categoryBooks, searchBooks]);

  const handelSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="container py-8 h-96 bg-hero-books-pattern bg-center w-full flex">
        <div className=" bg-lightGreyTrans w-full lg:w-fit mx-auto self-center py-2 px-20">
          <h1 className="hidden lg:block text-white text-4xl leading-normal text-center w-2/3 mx-auto tracking-wider font-bold">
            Browse All Your Favorites Books
          </h1>
          <h1 className="block lg:hidden text-white text-2xl leading-normal text-center lg:w-2/3 mx-auto tracking-wider font-bold">
            Enjoy
          </h1>
        </div>
      </div>
      <Search search={search} categories={categories} handelSearchChange={handelSearchChange} />
      {!loading && error ? (
        <div className="container py-8 bg-white">
          <h2 className="text-6xl text-grey">
            Oops! it seems like an error occur or no books found in this category please try again later{' '}
          </h2>
        </div>
      ) : (
        <>
          <Books books={books} loading={loading} />
          {(!category || category === 'all') && search === '' ? (
            <NewPagination lastFetched={lastFetched} setQueryAfter={setQueryAfter} pages={pages} />
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};

export default AllBooks;
