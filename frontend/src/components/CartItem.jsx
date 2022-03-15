import React from 'react';

export default function CartItem(props) {
  const { slug, title, author, quantity, price, photo, inStock, deleteBook, changeQuantity } = props;
  const handleDelete = () => {
    deleteBook(slug);
  };
  const handleChange = (e) => {
    changeQuantity(slug, e.target.value);
  };

  return (
    <div className="border-y border-white flex flex-col items-center md:flex-row p-10 md:w-100 md:h-56">
      <img src={photo} alt={title} className="w-28 h-28 md:mr-5 mr-0" />
      <div>
        <p className="font-bold text-lg tracking-widest uppercase mb-10">{`${title} , by ${author}`}</p>
        <div className="flex justify-start space-x-10">
          <select
            className="text-purple font-bold rounded p-2 hover:bg-gray-200"
            name="Qty"
            id="Qty"
            value={quantity}
            onChange={handleChange}
            data-testid={`${author}-${title}`}
          >
            {Array.from({ length: inStock }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                QTY: {n}
              </option>
            ))}
          </select>
          <button className="rounded py-2 px-4 bg-white text-purple font-bold hover:bg-gray-200" onClick={handleDelete}>
            Delete
          </button>
          <span className="text-lg font-semibold">{price}</span>
        </div>
      </div>
    </div>
  );
}
