import React, { useEffect, useState } from 'react';
import NewPagination from '../../../components/NewPagination';
import Table from './components/OrdersTable';
import Loading from '../../../components/Loading';
import { getAllOrders, deleteOrder } from './services/admin.orders.service';

const Orders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState('');
  const [queryAfter, setQueryAfter] = useState('');
  const [message, setMessage] = useState('');
  const [pages, setPages] = useState();

  const fetchData = async (queryAfter) => {
    setIsLoading(true);
    const { data, last, pages } = await getAllOrders(queryAfter, 10);
    setLastFetched(last);
    setData(data);
    setIsLoading(false);
    setPages(pages);
  };

  useEffect(() => {
    fetchData(queryAfter);
  }, [queryAfter]);

  const deleteHandler = async (e) => {
    setIsLoading(true);
    const id = e.target.id;
    const deletedItem = await deleteOrder(id, message);
    setData(data.filter((e) => e.order_id !== deletedItem.order_id));
    setIsLoading(false);
  };

  return (
    <div className="pt-16 flex flex-col">
      <div className="flex justify-center border-b-2 border-mc ">
        <span className="text-3xl font-bold text-mc mb-6">Orders</span>
      </div>
      {isLoading ? (
        <div className="mt-5">
          <Loading />
        </div>
      ) : (
        <Table
          headers={['ID', 'User', 'Total', 'Date', '']}
          data={data}
          handler={deleteHandler}
          setMessage={setMessage}
        />
      )}
      <div className="flex justify-center">
        <NewPagination lastFetched={lastFetched} setQueryAfter={setQueryAfter} pages={pages} />
      </div>
    </div>
  );
};

export default Orders;
