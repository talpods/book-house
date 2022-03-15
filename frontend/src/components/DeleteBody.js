import React from 'react';
export default function DeleteBody(title, setMessage, type) {
  return (
    <>
      <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-center ">Are you sure about delete {title}?</p>
      {type === 'order' && (
        <div className="flex flex-col items-start">
          <label className="font-semibold">Message for the customer</label>
          <textarea
            className="resize-none w-full mt-2 h-24 rounded-md border-2 p-2"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
