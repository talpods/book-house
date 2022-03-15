import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';
import { validateEmail, validatePassword } from '../../helpers/helpers';
import { signUp } from '../../services/UserRegistirationServices';

const Signup = () => {
  const [error, setError] = useState({
    email: null,
    password: null,
    confirm: null,
    post: null,
  });
  const [status, setStatus] = useState();
  const handleUserSignup = async (e) => {
    e.preventDefault();
    const first_name = document.getElementById('first_name')?.value;
    const last_name = document.getElementById('last_name')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const confirm_password = document.getElementById('confirm_password')?.value;

    if (!validateEmail(email)) setError({ ...error, email: 'Invalid email' });
    else if (!validatePassword(password))
      setError({
        ...error,
        password:
          'Password must be at least 8 characters and contains at least one capital letter, one digit and one symbol',
      });
    else if (password !== confirm_password) setError({ ...error, confirm: 'password must be the same' });
    else {
      setStatus('loading');
      try {
        const data = await signUp(first_name, last_name, email, password);
        if (!data.error) {
          setStatus('success');
          document.getElementById('signup-form').reset();
        } else {
          setError({ ...error, post: data.error });
          setStatus('fail');
        }
      } catch (err) {
        setError({ ...error, post: err.message });
        setStatus('fail');
      }
    }
  };

  return (
    <div className="w-full lg:w-cw  flex items-center justify-center mt-2 mb-6">
      <div className="flex items-center border-2 w-11/12 p-2 lg:w-5/6 ">
        <div className="w-full lg:w-2/3 h-fit-content bg-white rounded-md p-4 flex flex-col items-center mt-2">
          <div className="w-full flex flex-col ">
            <div className="flex items-center">
              <span className="font-bold text-2xl mb-2">Sign up</span>
              <img className="w-7 h-7" src="assets/crossfingers.svg" alt="crossed fingers" />
            </div>
            <div className="w-full flex items-center">
              <span>Already have an account ?</span>
              <Link to={'/signin'} className="font-bold ml-2" href="">
                Sign in
              </Link>
            </div>
          </div>
          <form
            data-testid="signup-form"
            id="signup-form"
            className="w-full lg:w-3/4 mt-10"
            onSubmit={handleUserSignup}
          >
            <div className="relative w-full">
              <div className="border"></div>
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 text-gray-600 bg-white p-4">
                Sign up with email
              </span>
            </div>
            {status !== 'success' && (
              <>
                <div className="w-full flex flex-col lg:flex-row  items-center justify-between mt-6 gap-4">
                  <div className="w-full lg:w-1/2 flex flex-col items-start">
                    <span>First Name</span>
                    <input
                      type="text"
                      id="first_name"
                      data-testid="signup_first_name"
                      required={true}
                      className="w-full px-2 py-3 border rounded-md border-mc mt-2 focus:border-mc"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col items-start">
                    <span>Last Name</span>
                    <input
                      type="text"
                      id="last_name"
                      data-testid="signup_last_name"
                      required={true}
                      className="w-full px-2 py-3 border rounded-md border-mc mt-2"
                    />
                  </div>
                </div>
                <div className="w-full mt-4 flex flex-col items-start relative">
                  <span>Email</span>
                  <input
                    type="email"
                    id="email"
                    data-testid="signup_email"
                    required={true}
                    className="w-full px-2 py-3 border rounded-md border-mc mt-2"
                  />
                  {error?.email && <ErrorMessage message={error.email} close={() => setError(null)} duration={5000} />}
                </div>
                <div className="w-full mt-4 flex flex-col items-start relative">
                  <span>Password</span>
                  <input
                    type="password"
                    id="password"
                    data-testid="signup_password"
                    required={true}
                    className="w-full px-2 py-3 border rounded-md border-mc mt-2"
                  />
                  {error?.password && (
                    <ErrorMessage message={error.password} close={() => setError(null)} duration={5000} />
                  )}
                </div>
                <div className="w-full mt-4 flex flex-col items-start relative">
                  <span>Confirm Password</span>
                  <input
                    type="password"
                    id="confirm_password"
                    data-testid="confirm_password"
                    className="w-full px-2 py-3 border rounded-md border-mc mt-2"
                    required={true}
                  />
                  {error?.confirm && (
                    <ErrorMessage message={error.confirm} close={() => setError(null)} duration={5000} />
                  )}
                </div>
              </>
            )}
            <div className="w-full h-60">
              {status === 'loading' ? (
                <div className="mt-2 flex items-center justify-center">
                  <Loading />{' '}
                </div>
              ) : status === 'success' ? (
                <div className="w-full flex flex-col items-center">
                  <Alert status={'success'} message="Conragtulations, you have created your account successfully" />
                  <Link to={'/signin'} className="mt-2">
                    Sign in now
                  </Link>
                </div>
              ) : status === 'fail' ? (
                <div className="w-full flex flex-col items-center">
                  <Alert status={'fail'} message={error.post} />
                  <button onClick={() => setStatus(null)} className="mt-2">
                    Please try again
                  </button>
                </div>
              ) : (
                <button
                  data-testid="regitser_btn"
                  type="submit"
                  className={`w-full px-2 py-3 font-semibold text-xl bg-mc text-white rounded-md mt-6 hover:bg-lp`}
                >
                  Sign Up
                </button>
              )}
            </div>
          </form>
        </div>
        <img className="hidden lg:block" src="assets/register.svg" alt="signup-welcome" />
      </div>
    </div>
  );
};

export default Signup;
