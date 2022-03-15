import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { validateEmail } from '../../helpers/helpers';
import ErrorMessage from '../../components/ErrorMessage';
import { userSignIn } from '../../services/UserRegistirationServices';
import Alert from '../../components/Alert';
import Loading from '../../components/Loading';

const Signin = () => {
  const [error, setError] = useState({ email: null, login: null });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleUserSignin = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    if (!validateEmail(email)) setError({ ...error, email: 'please enter a valid email' });
    else {
      setLoading(true);
      const data = await userSignIn(email, password);
      if (data.error) {
        setLoading(false);
        setError({ ...error, login: data.error });
      } else {
        localStorage.setItem('userData', JSON.stringify(data.data));
        if (data.data.role == 'admin') history.push('/admin/books');
        else if (history.location.pathname.includes('order')) history.push('/cart');
        else history.push('/');
      }
    }
  };

  return (
    <div className="lg:w-cw w-full flex items-center justify-center  mb-24">
      <div className="flex items-center border-2 w-11/12 p-2 lg:w-5/6 mt-4">
        <div className="w-full lg:w-2/3 h-fit-content bg-white rounded-md p-4 flex flex-col items-center mt-2">
          <div className="w-3/4 flex flex-col items start">
            <div className="flex items-center">
              <span className="font-bold text-2xl mb-2">Sign in</span>
              <img className="w-7 h-7" src="assets/crossfingers.svg" alt="crossed fingers" />
            </div>
            <a href="" className="">
              How do I get Started ?
            </a>
          </div>
          <form className="w-full lg:w-3/4 mt-10" onSubmit={(e) => handleUserSignin(e)}>
            <div className="relative">
              <div className="border"></div>
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 text-gray-600 bg-white p-4">
                Sign in with email
              </span>
            </div>
            <div className="w-full mt-4 flex flex-col items-start relative">
              <span>Email</span>
              <input
                type="email"
                id="email"
                name="email"
                data-testid="signin-email"
                required={true}
                className="w-full px-2 py-3 border rounded-md border-mc mt-2"
              />
              {error.email && <ErrorMessage message={error.email} close={() => setError({ ...error, email: null })} />}
            </div>
            <div className="w-full mt-4 flex flex-col items-start">
              <span>Password</span>
              <input
                type="password"
                id="password"
                name="password"
                data-testid="signin-password"
                className="w-full px-2 py-3 border rounded-md border-mc mt-2"
                required={true}
              />
              <div className="w-full flex items-center justify-end mt-2">
                <a href="" className="cursor-pointer">
                  forgot your password?
                </a>
              </div>
            </div>

            <div className="w-full h-60">
              {loading ? (
                <div className="mt-2 flex items-center justify-center">
                  <Loading />{' '}
                </div>
              ) : error.login ? (
                <div className="w-full flex flex-col items-center">
                  <Alert status={'fail'} message={error.login} />
                  <button onClick={() => setError({ ...error, login: null })} className="mt-2">
                    Please try again
                  </button>
                </div>
              ) : (
                <button
                  data-testid="signin-btn"
                  className="w-full px-2 py-3 font-semibold text-xl bg-mc text-white rounded-md mt-6 hover:bg-lp"
                >
                  Sign In
                </button>
              )}
              <div className="w-full flex items-center justify-center mt-4">
                <span>Don't have an account ? </span>
                <Link to={'/signup'} className="font-bold ml-2 cursor-pointer">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
        <img className="hidden lg:block" src="assets/register.svg" alt="login-welcome" />
      </div>
    </div>
  );
};

export default Signin;
