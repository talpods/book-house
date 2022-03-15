import React from "react";

export default function DeleteModal({ modalState, title, field, deleteFunc }) {
  const setModalState = () => {
    modalState();
  };

  const deleteHandler = () => {
    deleteFunc(field);
    modalState();
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 md:3/5 lg:w-2/5 h-auto my-6 mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className=" text-2xl font-semibold text-mc">{title}</h3>
              <svg
                onClick={setModalState}
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 text-mc self-center hover:text-lp ease-linear transition-all duration-150 outline-none focus:outline-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-center ">
                Are you sure about delete {title}?
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className=" hover:text-lp text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                type="button"
                onClick={setModalState}
              >
                Close
              </button>
              <button
                className=" hover:bg-lp bg-mc text-white active:bg-mcm font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                type="button"
                onClick={deleteHandler}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
