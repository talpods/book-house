import React from 'react';

const Shipping = () => {
  return (
    <div className="py-8">
      <h1 className="mb-5 font-bold text-xl">Shipping Address</h1>
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="flex flex-col items-starts">
          <label>Street</label>
          <input type={'text'} className="p-2 bg-white rounded-md mt-2 text-black" id="street" />
        </div>
        <div className="flex flex-col items-starts">
          <label>Apartment</label>
          <input type={'text'} className="p-2 bg-white rounded-md mt-2 text-black" id="suite" />
        </div>
      </div>
      <div className="flex  flex-col md:flex-row items-center gap-5 mt-5">
        <div className="flex flex-col items-starts">
          <label>City</label>
          <input type={'text'} className="p-2 bg-white rounded-md mt-2 text-black" id="city" />
        </div>
        <div className="flex flex-col items-starts">
          <label>Zipcode</label>
          <input type={'text'} className="p-2 bg-white rounded-md mt-2 text-black" id="zipcode" />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
