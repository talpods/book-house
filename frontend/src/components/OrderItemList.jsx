import React from 'react'
import OrderItem from './OrderItem'

export default function OrderItemList({products, currencyFormatter}) {
  return (
    <>
        {products && products.map(i => <OrderItem key={`${i.author}_${i.title}`} product={i} currencyFormatter={currencyFormatter} />)}
    </>
  )
}
