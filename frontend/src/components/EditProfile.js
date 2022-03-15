import React, { useState } from 'react';
import { updateProfile } from '../services/ProfileServices.js';
import Alert from './Alert.js';
import Loading from './Loading.js';

const EditProfile = ({ data }) => {
  const photo = data.phone;
  const [first_name, setFirst] = useState(data.first_name);
  const [last_name, setLast] = useState(data.last_name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [status, setStatus] = useState();
  const [error, setError] = useState();

  const handleEdit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const data = await updateProfile({ first_name, last_name, phone, photo });
    if (data.error) {
      setStatus('fail');
      setError(data.error);
    } else {
      setStatus('success');
      localStorage.setItem('userData', JSON.stringify({ ...data, first_name, last_name, email, phone }));
    }
  };

  const handleTryAgain = () => {
    setError(null);
    setStatus(null);
  };

  return (
    <form className="w-11/12 lg:w-2/3" onSubmit={(e) => handleEdit(e)}>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-5/12 flex flex-col items-start">
          <label htmlFor="first_name" className=" mb-2">
            First Name
          </label>
          <input
            name="first_name"
            data-testid="edit_first_name"
            type="text"
            value={first_name}
            className="focus:outline-none w-full border-bb border-b-2 pb-2"
            onChange={(e) => setFirst(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col items-start mt-4 lg:mt-0">
          <label htmlFor="last_name" className=" mb-2">
            Last Name
          </label>
          <input
            name={last_name}
            data-testid="edit_last_name"
            type="text"
            value={last_name}
            className="focus:outline-none w-full border-bb border-b-2 pb-2"
            onChange={(e) => setLast(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between mt-4 lg:mt-8">
        <div className="w-full lg:w-5/12 flex flex-col items-start">
          <label htmlFor="email" className=" mb-2">
            Email
          </label>
          <input
            disabled={true}
            name="email"
            type="email"
            data-testid="edit_email"
            value={email}
            className="focus:outline-none w-full border-bb border-b-2 pb-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col items-start mt-4 lg:mt-0">
          <label htmlFor="phone" className=" mb-2">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            data-testid="edit_phone"
            value={phone}
            placeholder="ex/0105555555555"
            className="focus:outline-none w-full border-bb border-b-2 pb-2"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      {status === 'loading' ? (
        <div className="w-full flex items-center justify-center mt-4">
          <Loading />
        </div>
      ) : status === 'fail' ? (
        <div className="w-full flex flex-col items-center">
          <Alert status={'fail'} message={error} />
          <span className="font-semibold cursor-pointer mt-2" onClick={() => handleTryAgain()}>
            Try Again
          </span>
        </div>
      ) : status === 'success' ? (
        <div className="w-full flex flex-col items-center">
          <Alert status={'success'} message={'Your data have been updated successfully'} />
          <span className="font-semibold cursor-pointer mt-2" onClick={() => handleTryAgain()}>
            Edit Again
          </span>
        </div>
      ) : (
        <button
          className="w-full p-3 bg-mc text-white text-xl font-bold mt-4 lg:mt-8 hover:bg-lp"
          data-testid="edit_profile_save"
        >
          Save
        </button>
      )}
    </form>
  );
};

export default EditProfile;
