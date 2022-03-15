import React from 'react';
import { useHistory } from 'react-router-dom';
import Alert from './Alert';
import { currencyFormatter, dateFormatter } from '../helpers/formatter';

const UserOrders = ({ orders, orders_error }) => {
  const history = useHistory();
  const handleOpenDetails = (id) => {
    history.push(`/orderdetails/${id}`);
  };

  return (
    <table data-testid="orders_table" className="text-left w-full px-6 md:w-11/12 table-auto">
      <thead className=" w-full block text-xl font-bold text-mc border-b-4 border-mc">
        <tr className="w-full hidden md:flex items-left justify-between">
          <th scope="col" className="w-3/5 pl-2">
            Order No.
          </th>
          <th scope="col" className="w-1/5">
            Total Price
          </th>
          <th scope="col" className="w-1/5">
            Ordered On
          </th>
          <th scope="col" className="w-1/5">
            Status
          </th>
          <th scope="col" className="w-3/5">
            Shipping Address
          </th>
        </tr>
      </thead>
      <tbody className="w-full block">
        {orders_error ? (
          <Alert status="fail" message={orders_error} />
        ) : orders ? (
          orders?.map((order) => (
            <tr
              key={order.order_id}
              className="text-mcm w-full flex flex-col md:flex-row items-left justify-between border-b-2 
         border-mcm hover:bg-purple hover:text-white cursor-pointer"
              onClick={() => handleOpenDetails(order.order_id)}
            >
              <td data-label="Order No" className="py-2 md:w-3/5 text-right md:text-left w-full pl-2">
                {order?.order_id}
              </td>
              <td data-label="Total Price" className="py-2 md:w-1/5 text-right md:text-left w-full">
                {currencyFormatter(order?.total_price)}
              </td>
              <td data-label="Ordered on" className="py-2 md:w-1/5 text-right md:text-left w-full ">
                {dateFormatter(order?.created_at)}
              </td>
              <td data-label="Status" className="py-2 md:w-1/5 text-right md:text-left w-full">
                {order?.status}
              </td>
              <td data-label="Shipping Address" className="py-2 md:w-3/5 text-right md:text-left w-full ">
                {`${order?.shipping_address?.street},${order?.shipping_address?.suite},
             ${order?.shipping_address?.city},[code : ${order?.shipping_address?.zipcode}]`}
              </td>
            </tr>
          ))
        ) : null}
      </tbody>
    </table>
  );
};

export default UserOrders;
