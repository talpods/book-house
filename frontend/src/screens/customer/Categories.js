import React, { useEffect, useState } from 'react';

import { getAllCategories } from '../../services/bookServices';

import CategoriesList from '../../components/CategoriesList';
import Loading from '../../components/Loading';

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { result, err } = await getAllCategories();
      setError(err);
      setCategories(result);
      setLoading(false);
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <div className="container py-8 h-96 bg-hero-categories-pattern bg-center w-full flex">
        <div className=" bg-lightGreyTrans w-full lg:w-fit mx-auto self-center py-2 px-20">
          <h1 className="hidden lg:block text-white text-4xl leading-normal text-center w-2/3 mx-auto tracking-wider font-bold">
            Find More Interesting Categories
          </h1>
          <h1 className="block lg:hidden text-white text-2xl leading-normal text-center lg:w-2/3 mx-auto tracking-wider font-bold">
            Categories
          </h1>
        </div>
      </div>
      {!loading ? (
        !error ? (
          <CategoriesList categories={categories} />
        ) : (
          <h2 className="text-6xl text-grey">Oops! it seams like an error occur please try again later </h2>
        )
      ) : (
        <div className="my-12 mx-auto p-5">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Categories;
