import React, { useState } from 'react';
import Modal from '../../../../components/Modal';
import DeleteBody from '../../../../components/DeleteBody';
import OrderView from './OrderView';
import { currencyFormatter, dateFormatter } from '../../../../helpers/formatter';

export default function Table({ headers, data, handler, setMessage }) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [orderViewModalIsOpen, setOrderViewModalIsOpen] = useState(false);
  const [orderData, setOrderData] = useState('');

  const style = {
    table: 'table-auto',
    tableHead: 'hidden border-b-2 border-mc md:table-header-group text-left ',
    columnHead: 'p-2',
    columnBody:
      'md:text-left p-2 before:content-[attr(data-label)] before:float-left before:font-bold before:uppercase md:before:content-[none] text-right',
    row: 'border-b-2 border-nc group  hover:bg-nc hover:text-mc md:hover:text-white md:hover:bg-mc cursor-pointer flex flex-col md:table-row',
    svg: 'text-mc h-7 md:group-hover:text-white',
  };

  const orderViewModalState = () => {
    orderViewModalIsOpen ? setOrderViewModalIsOpen(false) : setOrderViewModalIsOpen(true);
  };

  const deleteModalState = () => {
    deleteModalIsOpen ? setDeleteModalIsOpen(false) : setDeleteModalIsOpen(true);
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
    return data.map((order) => {
      return (
        <tr
          className={style.row}
          key={`${order.order_id}-${order.user}-${order.created_at}`}
          onClick={() => {
            setOrderData(order);
            setOrderViewModalIsOpen(true);
          }}
        >
          <td data-label="ID" className={style.columnBody}>
            {order.order_id}
          </td>
          <td data-label="User" className={style.columnBody}>
            {order.user}
          </td>
          <td data-label="Total" className={style.columnBody}>
            {currencyFormatter(order.total_price)}
          </td>
          <td data-label="Date" className={style.columnBody}>
            {dateFormatter(order.created_at)}
          </td>
          <td className={`${style.columnBody} flex justify-center `}>
            <svg
              onClick={(e) => {
                e.stopPropagation();
                setOrderData(order);
                setDeleteModalIsOpen(true);
              }}
              xmlns="http://www.w3.org/2000/svg"
              className={style.svg}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
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
      {deleteModalIsOpen && (
        <Modal
          modalState={deleteModalState}
          title={`Order No. ${orderData.order_id}`}
          body={DeleteBody(`Order No. ${orderData.order_id}`, setMessage, 'order')}
          btn={{
            title: 'Confirm',
            attr: {
              type: 'button',
              onClick: handler,
              id: orderData.order_id,
            },
          }}
        />
      )}
      {orderViewModalIsOpen && (
        <Modal
          modalState={orderViewModalState}
          title={`Order No. ${orderData.order_id}`}
          body={<OrderView order={orderData} />}
          footer={false}
        />
      )}
    </>
  );
}
