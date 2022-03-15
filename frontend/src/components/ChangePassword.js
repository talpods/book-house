import React, { useState } from 'react';
import { validatePassword } from '../helpers/helpers';
import { changePassword } from '../services/ProfileServices';
import Alert from './Alert';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

const ChangePassword = () => {
  const [old_password, setOld] = useState();
  const [new_password, setNew] = useState();
  const [confirm, setConfirm] = useState();
  const [status, setStatus] = useState();
  const [error, setError] = useState({ confirm: null, change: null, password: null });

  const handleEdit = async (e) => {
    e.preventDefault();
    if (new_password != confirm) setError({ ...error, confirm: 'Password must be the same' });
    else if (!validatePassword(new_password))
      setError({
        ...error,
        password:
          'Password must be at least 8 characters and contains at least one capital letter, one digit and one symbol',
      });
    const data = await changePassword(old_password, new_password);
    if (data.error) {
      setStatus('fail');
      setError({ ...error, change: data.error });
    } else {
      setStatus('success');
    }
  };

  const handleTryAgain = () => {
    setError(null);
    setStatus(null);
  };

  return (
    <form className="w-11/12 lg:w-2/3" onSubmit={(e) => handleEdit(e)}>
      <div className="w-full flex flex-col items-start">
        <label htmlFor="old_pass" className=" mb-2">
          Old Password
        </label>
        <input
          name="old_pass"
          required={true}
          data-testid="edit_pass_old"
          type="password"
          placeholder="enter your old password"
          className="focus:outline-none w-full border-bb border-b-2 pb-2"
          onChange={(e) => setOld(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col items-start mt-4 lg:mt-8 relative">
        <label htmlFor="password" className=" mb-2">
          New Password
        </label>
        <input
          name="password"
          required={true}
          data-testid="new_password"
          type="password"
          placeholder="enter your new password"
          className="focus:outline-none w-full border-bb border-b-2 pb-2"
          onChange={(e) => setNew(e.target.value)}
        />
        {error?.password && <ErrorMessage message={error.password} close={() => setError(null)} duration={5000} />}
      </div>
      <div className="w-full flex flex-col items-start mt-4 lg:mt-8 relative">
        <label htmlFor="confirm_pass" className="">
          Confirm Password
        </label>
        <input
          name="confirm_pass"
          required={true}
          data-testid="confirm_new_password"
          type="password"
          placeholder="confirm your password"
          className="focus:outline-none w-full border-bb border-b-2 pb-2"
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error?.confirm && <ErrorMessage message={error.confirm} close={() => setError(null)} duration={5000} />}
      </div>
      {status === 'loading' ? (
        <div className="w-full flex items-center justify-center mt-4">
          <Loading />
        </div>
      ) : status === 'fail' ? (
        <div className="w-full flex flex-col items-center">
          <Alert status={'fail'} message={error.change} />
          <span className="font-semibold cursor-pointer mt-2" onClick={() => handleTryAgain()}>
            Try Again
          </span>
        </div>
      ) : (
        <button
          className="w-full p-3 bg-mc text-white text-xl font-bold mt-8 hover:bg-lp"
          data-testid="change_pass_btn"
        >
          Save
        </button>
      )}
    </form>
  );
};

export default ChangePassword;
