import React from 'react'

export default function OrderItem(props) {
  const {title, photo, quantity, price} = props.product;
  return (
    <div className="w-full lg:w-1/3 h-32 flex items-center p-2 border-2">
            <img
              className="h-full max-w-1/2"
              src={photo}
              alt={title}
            />
            <div className="h-full flex flex-col items-start justify-between ml-4">
              <div>{title}</div>
              <div>
                <span>Price : </span>
                <span>{props.currencyFormatter(price)}</span>
              </div>
              <div>
                <span>Quantity : </span>
                <span>{quantity}</span>
              </div>
            </div>
          </div>
  )
}
