import React from 'react';
import { useForm } from 'react-hook-form';

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

export default function BookForm({ edit = false, data = null, submit, categories }) {
  const formEntity = {
    title: data?.title,
    author: data?.author,
    price: data?.price,
    category: data?.category,
    book_cover: data?.photo,
    description: data?.description,
    quantity: data?.quantity,
    publish_date: data?.publish_date ? formatDate(data.publish_date) : undefined,
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
  } = useForm({ defaultValues: formEntity, mode: 'all' });

  const formValid = () => !isDirty || !isValid;

  const style = {
    row: 'flex flex-col md:flex-row  gap-1 md:gap-5',
    column: 'flex flex-col gap-1 mb-2 w-42 flex-grow',
    columnTitle: 'text-mc font-bold capitalize',
    error: 'text-red-600',
    formInput: 'w-full p-1 border border-mc rounded-md outline-mc hover:border-lp form-input resize-none',
    submitBtn: ` hover:bg-lp bg-mc text-white active:bg-mcm mt-3 font-bold uppercase text-sm px-6 py-3 rounded shadow
     hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:cursor-not-allowed disabled:bg-dsbld`,
  };

  const errorMessages = {
    title: 'The book title should be at least 3 characters!',
    author: 'The author name should be at least 3 characters! ',
    price: 'The book must have a price!',
    category: 'The book must have a category!',
    description: 'The book must have description at least 10 characters!',
    quantity: 'The book must have a quantity in stock!',
    book_cover: 'The book should have cover image!',
    publish_date: 'The book must have a publish date!',
  };

  const onSubmit = (form) => {
    if (form.book_cover.length === 0)
      setError('book_cover', {
        type: 'required',
        message: '',
      });
    if (form.category === '-') {
      setError('category', {
        type: 'required',
        message: '',
      });
    }
    const body = {
      title: form.title,
      author: form.author,
      category: form.category,
      price: form.price,
      description: form.description,
      publish_date: form.publish_date,
      quantity: form.quantity,
      photo: form.book_cover,
      slug: data?.slug,
    };
    submit(body);
  };

  const input = (name, type, placeHolder = '', validation = {}) => {
    const n = name.toLowerCase().replace(' ', '_');
    return (
      <div className={style.column}>
        <label className={style.columnTitle} htmlFor={n}>
          {name}
        </label>
        <input
          {...register(n, validation)}
          name={n}
          type={type}
          className={style.formInput}
          placeholder={placeHolder}
          data-testid={n + '-test'}
          id={`${n}-id`}
          aria-describedby={n}
        />
        {errors[n] && <span className={style.error}>{errorMessages[n]}</span>}
      </div>
    );
  };

  return (
    <form className=" flex flex-col" encType="multipart/form-data" id="book-form" onSubmit={handleSubmit(onSubmit)}>
      {input('Title', 'text', 'Enter Book Name', {
        required: true,
        minLength: 3,
      })}
      {input('Author', 'text', 'Enter Author Name', {
        required: true,
        minLength: 3,
      })}

      <div className={style.row}>
        {input('Price', 'number', 'Enter Book Price', {
          required: true,
          min: 1,
        })}
        {input('Quantity', 'number', 'Enter Book Quantity', {
          required: true,
          min: 1,
        })}
      </div>

      {input('Publish Date', 'date', 'Enter Book Publish Date', {
        required: true,
      })}

      <div className={style.column}>
        <label className={style.columnTitle}>Category</label>
        <select
          {...register('category', { required: true })}
          name="category"
          className={`${style.formInput} bg-white `}
        >
          <option value={'-'} key={'-'}>
            -
          </option>
          {categories.map((category) => {
            return (
              <option value={category.slug} key={category.title}>
                {category.title}
              </option>
            );
          })}
        </select>
        {errors.category && <span className={style.error}>{errorMessages.category}</span>}
      </div>

      {input('Book Cover', 'file', edit ? '' : { required: true })}

      <div className={style.column}>
        <label className={style.columnTitle}>Description</label>
        <textarea
          {...register('description', {
            required: true,
            minLength: 10,
          })}
          name="description"
          cols="10"
          rows="3"
          className={style.formInput}
          placeholder="Enter Description About The Book"
        ></textarea>
        {errors.description && <span className={style.error}>{errorMessages.description}</span>}
      </div>

      <div className={style.column}>
        <button className={style.submitBtn} type="submit" form="book-form" disabled={formValid()}>
          {edit ? 'Save Book' : 'Add Book'}
        </button>
      </div>
    </form>
  );
}
