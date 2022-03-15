import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const CategoriesList = ({ categories = [] }) => {
  return (
    <div className="container pg-white py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.length > 0 ? (
        categories.map((category, i) => (
          <Link key={i} to={`/books/${category.slug}`} className="flex flex-col justify-between items-center">
            <div className="w-60 h-60 rounded-full bg-lightPurple">
              <img
                src={category.photo}
                alt="development"
                className="w-60 h-60 rounded-full border-2 border-lightPurple mix-blend-overlay hover:opacity-100 opacity-90 transition ease-in-out duration-200"
              />
            </div>
            <h2 className="text-xl font-semibold text-grey">{category.title}</h2>
          </Link>
        ))
      ) : (
        <p className="text-grey text-2xl text-center">There are no categories right now</p>
      )}
    </div>
  );
};

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoriesList;
