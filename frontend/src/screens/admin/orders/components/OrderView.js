import React from 'react';
import { currencyFormatter, dateFormatter } from '../../../../helpers/formatter';

export default function OrderView({ order }) {
  console.log(order)
  const style = {
    row: 'text-lg leading-relaxed border-b-2 border-mc pb-2 flex m-2 flex-wrap gap-2',
    title: 'text-mc font-bold self-center w-40 justify-center',
    addrssRow: 'flex gap-5',
    addressSubHeader: 'text-mc font-bold w-20',
    productSubheader: 'text-mc font-bold',
  };

  return (
    <div className="flex flex-col gap-3">
      <div className={style.row}>
        <span className={style.title}>Order ID</span>
        <span>{order.order_id}</span>
      </div>
      <div className={style.row}>
        <span className={style.title}>Customer Name </span>
        <span>{order.user}</span>
      </div>
      <div className={style.row}>
        <span className={style.title}>Order Date</span>
        <span>{dateFormatter(order.created_at)}</span>
      </div>
      <div className={style.row}>
        <span className={style.title}>Order Status</span>
        <span>{order.status}</span>
      </div>

      <div className={style.row}>
        <span className={`${style.title} w-36`}>Products</span>
        <span>
          <ul>
            {order.products.map((product) => (
              <li key={product.M.sk} className=" border-b-2 border-nc last:border-hidden">
                <span className={style.productSubheader}>Book Title:</span> {product.M.sk.split("#")[1].replaceAll("-"," ")},{' '}
                <span className={style.productSubheader}>Qty:</span> {product.M.quantity},{' '}
                <span className={style.productSubheader}>Price: </span>
                {currencyFormatter(product.M.price)}
              </li>
            ))}
          </ul>
        </span>
      </div>

      <div className={style.row}>
        <span className={`${style.title}`}>Customer Address</span>
        <div>
          {order.shipping_address.city && (
            <div className={style.addrssRow}>
              <span className={style.addressSubHeader}>city</span>
              <span>{order.shipping_address.city}</span>
            </div>
          )}
          {order.shipping_address.street && (
            <div className={style.addrssRow}>
              <span className={style.addressSubHeader}>street</span>
              <span>{order.shipping_address.street}</span>
            </div>
          )}
          {order.shipping_address.suite && (
            <div className={style.addrssRow}>
              <span className={style.addressSubHeader}>suite</span>
              <span>{order.shipping_address.suite}</span>
            </div>
          )}
          {order.shipping_address.zipcode && (
            <div className={style.addrssRow}>
              <span className={style.addressSubHeader}>zip-code</span>
              <span>{order.shipping_address.zipcode}</span>
            </div>
          )}
        </div>

      </div>
      <div className="text-lg leading-relaxed  pb-2 flex m-2 ">
        <span className={style.title}>Total Price</span>
        <span>{currencyFormatter(order.total_price)}</span>
      </div>
    </div>
  );
}
