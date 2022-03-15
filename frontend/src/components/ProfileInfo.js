import React from 'react';
import Alert from '../components/Alert';
const ProfileInfo = ({ data, error }) => {
  if (error) {
    return (
      <div className="w-3/4">
        <Alert status={'fail'} message={error} />
      </div>
    );
  }
  if (!data) return null;
  return (
    <div className="w-11/12 lg:w-2/3">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-5/12 flex flex-col items-start">
          <span className=" mb-2">First Name</span>
          <span data-testid="first_name" className="focus:outline-none w-full border-bb border-b-2 pb-2">
            {data?.first_name}
          </span>
        </div>
        <div className="w-full lg:w-5/12 flex flex-col items-start mt-4 lg:mt-0">
          <span className=" mb-2">Last Name</span>
          <span data-testid="last_name" className="focus:outline-none w-full border-bb border-b-2 pb-2">
            {data?.last_name}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between mt-4 lg:mt-8">
        <div className="w-full lg:w-5/12 flex flex-col items-start">
          <span className=" mb-2">Email</span>
          <span data-testid="email" className="focus:outline-none w-full border-bb border-b-2 pb-2">
            {data?.email}
          </span>
        </div>
        <div className="w-full lg:w-5/12 flex flex-col items-start mt-4 lg:mt-0">
          <span className=" mb-2">Phone</span>
          <span data-testid="phone" className="focus:outline-none w-full border-bb border-b-2 pb-2">
            {data?.phone || 'No phone Number added'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
