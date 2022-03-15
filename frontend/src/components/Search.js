import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const Search = ({ search, handelSearchChange, categories }) => {
  const history = useHistory();
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState(null);

  const handelSelectChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="pt-14 relative">
      <p className="text-grey tracking-wider text-center text-4xl font-thin">
        Search in a collection of the most popular books out there.
      </p>
      <div className="flex justify-evenly items-center py-8">
        <div className="flex flex-row justify-between bg-hero-pattern basis-5/6 p-3 px-4 rounded-full">
          <input
            data-testid="searchBar"
            type="text"
            placeholder="Search here for your favorite book"
            value={search}
            onChange={(e) => handelSearchChange(e)}
            className="bg-hero-pattern outline-none text-grey placeholder:text-nb placeholder:tracking-widest basis-11/12"
          />
          <button
            className={search.length <= 3 ? 'bg-none cursor-not-allowed opacity-80' : 'bg-none opacity-100'}
            data-testid="search"
            disabled={search.length <= 3 ? true : false}
          >
            <img src="/assets/magnify.svg" className="w-5 h-5" alt="" />
          </button>
        </div>
        <button onClick={() => setShowFilter(!showFilter)} className="bg-hero-pattern self-center p-2 rounded-lg">
          <img src="/assets/filter.svg" className="w-7 h-7" alt="" />
        </button>
      </div>
      {showFilter ? (
        <div
          className="flex  flex-col lg:flex-row bg-hero-pattern px-8 py-4 items-center justify-evenly 
            w-3/4 lg:w-1/2 rounded-3xl absolute right-5"
        >
          <div className="my-2 lg:my-0 text-center">
            <label className="text-grey font-semibold text-lg px-4">Category:</label>
            <select
              defaultValue={category}
              onChange={(e) => handelSelectChange(e)}
              className="py-2 px-4 border-grey border-solid border-x border-y bg-white text-grey rounded-full"
            >
              <option value={'all'}> select a category</option>
              {categories.length > 0 &&
                categories.map((category, i) => (
                  <option key={i} value={category.title}>
                    {category.title}
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={() => history.push(`/books/${category}`)}
            className="bg-purple text-white py-2 px-10 rounded-3xl"
          >
            Filter
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.string,
  categories: PropTypes.array,
  handelSearchChange: PropTypes.func,
};

export default Search;
