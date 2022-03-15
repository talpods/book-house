import React from 'react';
import { usePagination } from '../helpers/usePagination';
const Pagination = ({ page, total, perPage, setPage }) => {
  const width = window.screen.width;
  const paginationRange =
    usePagination({
      totalCount: total,
      currentPage: page,
      pageSize: perPage,
      siblingCount: width < 600 ? 0 : 2,
    }) || [];
  const last = paginationRange[paginationRange.length - 1];

  const handleNext = () => {
    if (page < last) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(last);
    }
  };
  return (
    <section className="h-16 bg-white bottom-8 mt-6 flex items-center justify-center p-2">
      <button
        className="w-7 md:w-10 h-full rounded-sm border text-xl mr-2 font-bold text-mc"
        onClick={() => handlePrev()}
      >
        &#60;
      </button>

      {paginationRange?.map((e, index) => {
        if (e === '...')
          return (
            <span key={index} className="w-7 md:w-10 h-full rounded-sm border text-xl mr-2 font-bold text-center">
              {e}
            </span>
          );
        return (
          <button
            key={index}
            onClick={() => setPage(e)}
            className={`w-7 md:w-10 h-full rounded-sm border text-xl mr-2
                  font-bold ${
                    e === page ? 'bg-purple text-white hover:bg-lp' : 'bg-white text-purple hover:bg-gray-200'
                  } `}
            disabled={page === e}
          >
            {e}
          </button>
        );
      })}
      <button
        className="w-7 md:w-10 h-full rounded-sm border text-xl mr-2 font-bold text-mc"
        onClick={() => handleNext()}
      >
        {'>'}
      </button>
    </section>
  );
};
// const Pagination = ({ page, lastArray, setPage }) => {
//   return (
//     <div className="flex w-20 justify-evenly items-center text-center mx-auto">
//       <button
//         onClick={(e) => setPage(page === -1 ? 0 : page - 1)}
//         disabled={page === -1 ? true : false}
//         className="bg-lightGrey text-xl text-purple p-4"
//       >
//         {' '}
//         {'<'}
//       </button>
//       <button
//         onClick={(e) => setPage(page < lastArray.length - 2 ? page + 1 : lastArray.length - 1)}
//         disabled={lastArray.length - page === 1 ? true : false}
//         className="bg-lightGrey text-xl text-purple p-4"
//       >
//         {' '}
//         {'>'}
//       </button>
//     </div>
//   );
// };

export default Pagination;
