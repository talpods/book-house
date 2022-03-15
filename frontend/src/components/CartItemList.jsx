import React from 'react'
import CartItem from './CartItem'

export default function CartItemList({products, deleteBook, changeQuantity, currencyFormatter}) {
  return (
    <>
        {products && products.map(i => <CartItem key={`${i.slug}`} slug={i.slug} title={i.title} author={i.author} quantity={i.quantity} price={currencyFormatter(i.price)} photo={i.photo} inStock={i.inStock} deleteBook={deleteBook} changeQuantity={changeQuantity} />)}
    </>
  )
}
