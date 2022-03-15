import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import OrderItemList from '../../components/OrderItemList';
import { currencyFormatter } from '../../helpers/formatter';
import axios from '../../services/axios';

const OrderDetails = (props) => {
  const [order, setOrder] = useState({});
  const [orderLoading, setOrderLoading] = useState(true);
  const order_number = useParams().order_id;

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_ORDERS_URL}/${order_number}`);
      setOrder(data);
      setOrderLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, [order_number]);

  return (
    <>
      {order == undefined ? (
        <div className=" text-5xl font-bold flex justify-center items-center w-full h-96">
          <p>Order Not Found!!</p>
        </div>
      ) : orderLoading ? (
        <div className="my-24">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col container items-center relative min-h-screen">
          <div className="w-full flex flex-col items-center mt-8 py-8 text-grey">
            <h1 className="font-bold text-xl">Order ID : {order_number}</h1>
            <div className="flex flex-col lg:flex-row items-center justify-between w-1/2 mt-4">
              <div className="font-meduim text-lg">
                <span>Total : </span>
                <span className="font-bold" data-testid="total">
                  {currencyFormatter(order.total_price)}
                </span>
              </div>
              <div className="font-meduim text-lg">
                <span>Date : </span>
                <span className="italic">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center lg:justify-evenly lg:flex-wrap gap-10 mt-8">
              <OrderItemList products={order.products} currencyFormatter={currencyFormatter} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
