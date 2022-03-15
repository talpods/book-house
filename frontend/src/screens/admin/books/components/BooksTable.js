import React, { useState } from 'react';
import Modal from '../../../../components/Modal';
import { currencyFormatter, dateFormatter } from '../../../../helpers/formatter';
import BookForm from './BookForm';
import DeleteBody from '../../../../components/DeleteBody';

export default function Table({ data, categories, editFunc, deleteFunc }) {
  const headers = ['Title', 'Price', 'Quantity', 'Publish Date', ' '];
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [bookData, setBookData] = useState('');

  const style = {
    table: 'table-auto',
    tableHead: 'hidden border-b-2 border-mc md:table-header-group text-center',
    columnHead: 'p-2 text-left',
    columnBody:
      ' p-2 before:content-[attr(data-label)] before:float-left before:font-bold before:uppercase md:before:content-[none] text-right md:text-left',
    row: 'border-b-2 border-nc group  hover:bg-nc hover:text-mc md:hover:text-white md:hover:bg-mc cursor-pointer flex flex-col md:table-row',
    icon: 'h-7 text-mc group-hover:text-white',
  };

  const deleteModalState = () => {
    deleteModalIsOpen ? setDeleteModalIsOpen(false) : setDeleteModalIsOpen(true);
  };

  const editModalState = () => {
    editModalIsOpen ? setEditModalIsOpen(false) : setEditModalIsOpen(true);
  };

  const tableHeader = (headers) => {
    return (
      <tr>
        {headers.map((head) => (
          <th scope="col" className={style.columnHead} key={head}>
            {head}
          </th>
        ))}
      </tr>
    );
  };

  const tableBody = (data) => {
    return data.map((book) => {
      return (
        <tr className={style.row} key={`${book.title}-${book.author}`}>
          <td data-label="Title" className={`${style.columnBody}`}>
            {book.title}
          </td>
          <td data-label="Price" className={`${style.columnBody}`}>
            {currencyFormatter(book.price)}
          </td>
          <td data-label="Quantity" className={`${style.columnBody}`}>
            {book.quantity}
          </td>
          <td data-label="Publish Date" className={`${style.columnBody}`}>
            {dateFormatter(book.publish_date)}
          </td>
          <td className={`${style.columnBody} flex justify-center gap-2`}>
            <svg
              onClick={() => {
                setBookData(book);
                setEditModalIsOpen(true);
              }}
              name="edit-book"
              role="edit"
              data-testid="edit-book"
              xmlns="http://www.w3.org/2000/svg"
              className={style.icon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <svg
              onClick={() => {
                setBookData(book);
                setDeleteModalIsOpen(true);
              }}
              name="delete-book"
              role="delete"
              data-testid="delete-book"
              xmlns="http://www.w3.org/2000/svg"
              className={style.icon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <table className={style.table}>
        <thead className={style.tableHead}>{tableHeader(headers)}</thead>
        <tbody>{tableBody(data)}</tbody>
      </table>

      {editModalIsOpen && (
        <Modal
          modalState={editModalState}
          title={`Edit ${bookData.title} info`}
          body={<BookForm submit={editFunc} categories={categories} data={bookData} edit={true} />}
          footer={false}
        />
      )}

      {deleteModalIsOpen && (
        <Modal
          modalState={deleteModalState}
          title={`${bookData.title} Book`}
          body={DeleteBody(`${bookData.title} book`, null, 'book')}
          btn={{
            title: 'Confirm',
            attr: {
              type: 'button',
              onClick: deleteFunc,
              id: bookData.slug,
            },
          }}
        />
      )}
    </>
  );
}
