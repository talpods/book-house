import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Table from './components/BooksTable';
import NewPagination from '../../../components/NewPagination';
import Modal from '../../../components/Modal';
import BookForm from './components/BookForm';
import { addBook, getAllBooks, updateBook, deleteBook } from './services/admin.books.service';
import { getAllCategories } from '../categories/services/admin.categories.service';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [newBookModalIsOpen, setNewBookModalIsOpen] = useState(false);
  const [error, setError] = useState(null);

  //pagination
  const [lastFetched, setLastFetched] = useState('');
  const [queryAfter, setQueryAfter] = useState('');
  const [pages, setPages] = useState();

  const getBooks = async (queryAfter) => {
    setIsLoading(true);
    const { result, last, pages } = await getAllBooks(queryAfter);
    setPages(pages);
    setLastFetched(last);
    setBooks(result);
    setIsLoading(false);
  };

  const getCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  };

  useEffect(() => {
    getCategories();
    getBooks(queryAfter);
  }, [queryAfter]);

  const bookModalState = () => {
    newBookModalIsOpen ? setNewBookModalIsOpen(false) : setNewBookModalIsOpen(true);
  };

  const newBookHandler = async (data) => {
    loading();
    const { error } = await addBook(data);
    setNewBookModalIsOpen(false);
    messageHandler(error);
    getBooks(queryAfter);
  };

  const editBookHandler = async (data) => {
    loading();
    const { error } = await updateBook(data);
    setNewBookModalIsOpen(false);
    messageHandler(error);
    getBooks(queryAfter);
  };

  const deleteBookHandler = async (e) => {
    loading();
    const id = e.target.id;
    const { error } = await deleteBook(id);
    setNewBookModalIsOpen(false);
    messageHandler(error);
    getBooks(queryAfter);
  };

  const loading = () => {
    isLoading ? setIsLoading(false) : setIsLoading(true);
  };

  const messageHandler = (message) => {
    if (message) setError(message);
    setIsLoading(false);
  };

  return (
    <div className="pt-16 flex flex-col">
      <div className="flex justify-between border-b-2 border-mc mb-4 pb-2">
        <span className="text-3xl font-bold text-mc ">Books</span>
        <button
          onClick={() => {
            setNewBookModalIsOpen(true);
          }}
          className="py-2 px-3 md:px-4 rounded-sm bg-mc text-white text-center  text-base 
              hover:bg-lp"
        >
          Add New Book
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Table data={books} categories={categories} editFunc={editBookHandler} deleteFunc={deleteBookHandler} />
          {newBookModalIsOpen && (
            <Modal
              modalState={bookModalState}
              title="Add New Book"
              body={<BookForm submit={newBookHandler} categories={categories} />}
              footer={false}
            />
          )}
        </>
      )}
      <div className="flex justify-center"></div>
      <NewPagination lastFetched={lastFetched} setQueryAfter={setQueryAfter} pages={pages} />
    </div>
  );
};

export default Books;
