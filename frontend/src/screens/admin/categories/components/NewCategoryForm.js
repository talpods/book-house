import React from 'react';
import { useForm } from 'react-hook-form';

export default function NewCategoryForm({ submit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      photo: '',
    },
    mode: 'all',
  });

  const style = {
    column: 'flex flex-col gap-1 mb-2 flex-grow',
    columnTitle: 'text-mc font-bold',
    error: 'text-red-600 mt-1 text-sm',
    formInput: `w-full p-2 border border-mc rounded-md ${
      errors.title ? 'outline-red-600 border-red-600 ' : 'outline-mc border-mc '
    } hover:border-lp`,
    submitBtn: ` hover:bg-lp bg-mc text-white active:bg-mcm mt-3 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg
     outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:cursor-not-allowed disabled:bg-dsbld`,
  };

  const onSubmit = (value) => {
    const data = {
      title: value.title,
      photo: value.photo,
    };

    submit(data);
  };

  return (
    <form className={style.column} onSubmit={handleSubmit(onSubmit)} id="category-form">
      <section>
        <label className={style.columnTitle}>Title</label>
        <input
          {...register('title', { required: true, minLength: 3 })}
          name="title"
          type="text"
          className={style.formInput}
          placeholder="Enter Category Name"
        />
        {errors.title && <span className={style.error}>The category title should be at least 3 characters!</span>}
      </section>

      <section>
        <label className={style.columnTitle}>Category Cover</label>
        <input {...register('photo', { required: true })} name="photo" type="file" className={style.formInput} />
        {errors.photo && <span className={style.error}>The category should have cover image!</span>}
      </section>

      <button className={style.submitBtn} type="submit" form="category-form" disabled={!isValid}>
        Add New Category
      </button>
    </form>
  );
}
