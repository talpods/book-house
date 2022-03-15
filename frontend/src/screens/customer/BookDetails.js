import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BooksSlider from '../../components/BooksSlider';
import BookItem from '../../components/BookItem';

import { getSingleBook, getBooksByCategory } from '../../services/bookServices';
import Loading from '../../components/Loading';

const BookDetails = ({ setCartItemsCount }) => {
  const [book, setBook] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { title } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      const { result, err } = await getSingleBook(title);
      setError(err);
      setBook(result);
      if (!err) {
        const { similar, err } = await getBooksByCategory(result.category, 1, 3);
        setError(err);
        setSimilarBooks(similar);
      }
      setLoading(false);
    };
    fetchBook();
  }, [title]);

  return loading ? (
    <div className="my-12 mx-auto p-5">
      <Loading />
    </div>
  ) : error ? (
    <div className="container py-8 bg-white">
      <h2 className="text-6xl text-grey">Oops! it seams like an error occur please try again later </h2>
    </div>
  ) : (
    <div>
      <BookItem book={book} setCartItemsCount={setCartItemsCount} />
      {similarBooks.length > 1 ? <BooksSlider loading={loading} books={similarBooks} slug={title} /> : ''}
    </div>
  );
};

export default BookDetails;
