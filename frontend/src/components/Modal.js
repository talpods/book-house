import React from "react";

export default function AddNewCategoryModal({
  modalState,
  title,
  body,
  btn = { attr: { type: "button", disabled: false }, title: "Add" },
  footer = true,
}) {
  const setModalState = () => {
    modalState();
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed 
      inset-0 z-50 outline-none focus:outline-none h-screen top-10">
        <div className="relative w-auto  mx-auto h-screen">
          {/*content*/}
          <div className="border-0 rounded-lg  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none
            overflow-hidden" >
            {/*header*/}
            <div className="flex items-start justify-between py-3 px-6 border-b border-solid border-blueGray-200 rounded-t gap-5">
              <h3 className=" text-xl md:text-2xl font-semibold text-mc">{title}</h3>
              <svg
                onClick={setModalState}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 md:h-7 text-mc self-center hover:text-lp ease-linear transition-all duration-150 outline-none focus:outline-none"
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
            <div className="relative p-6 flex-auto overflow-auto">{body}</div>
            {/*footer*/}
            {footer && (
              <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className=" hover:text-lp text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={setModalState}
                >
                  Close
                </button>
                <button
                  className=" hover:bg-lp bg-mc text-white active:bg-mcm font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  {...btn.attr}
                >
                  {btn.title}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
