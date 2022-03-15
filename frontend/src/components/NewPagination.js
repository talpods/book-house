import { useState } from 'react';

const NewPagination = ({ lastFetched, setQueryAfter, pages }) => {
  const [pagingStack, setPagingStack] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <>
      {((page === 1 && lastFetched !== undefined) || page !== 1) && (
        <div className="h-16 bg-white bottom-8 mt-6 flex items-center justify-center p-2">
          <button
            onClick={(e) => {
              if (pagingStack.length === 1) {
                setQueryAfter('');
                setPagingStack([]);
              } else {
                setQueryAfter(pagingStack[pagingStack.length - 2]);
                setPagingStack((prevState) => prevState.slice(0, -1));
              }
              setPage((p) => p - 1);
            }}
            disabled={pagingStack.length < 1}
            className="w-7 md:w-10 h-full rounded-sm border text-xl mr-2 font-bold text-mc disabled:cursor-not-allowed"
          >
            {' '}
            {'<'}
          </button>
          <button
            className="w-16 h-full rounded-sm border text-xl mr-2 font-bold text-center text-white bg-mc disabled:cursor-not-allowed"
            disabled={true}
          >
            {pages ? `${page} / ${pages}` : page}
          </button>
          <button
            onClick={() => {
              setQueryAfter(lastFetched);
              setPagingStack((prevState) => [...prevState, lastFetched]);
              setPage((p) => p + 1);
            }}
            disabled={lastFetched === undefined}
            className="w-7 md:w-10 h-full rounded-sm border text-xl mr-2 font-bold text-mc disabled:cursor-not-allowed"
          >
            {' '}
            {'>'}
          </button>
        </div>
      )}
    </>
  );
};

export default NewPagination;
