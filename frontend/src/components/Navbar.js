import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from '../services/UserRegistirationServices';
const Navbar = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || null;
  const [showMenu, setShowMenu] = useState(false);
  const { cartItemsCount } = props;

  return (
    <div className="flex flex-col">
      <div className="w-screen  flex items-center justify-center bg-nc h-16">
        <div className="w-full lg:w-cw  pl-2 lg:pl-8 pr-6 md:pr-12 lg:pr-16 flex items-center justify-between  ">
          <Link to={'/'} className="cursor-pointer">
            <img src="/assets/logo.svg" alt="logo" className="w-20 h-full" />
          </Link>
          <div className=" hidden lg:flex items-center">
            <Link to={'/'} className="px-6 py-4 font-medium text-gray-600 text-lg">
              Home
            </Link>
            <Link to={'/books/all'} className="px-6 py-4 font-medium text-gray-600 text-lg">
              Books
            </Link>
            <Link to={'/categories'} className="px-6 py-4 font-medium text-gray-600 text-lg">
              Categories
            </Link>
          </div>
          <div className=" hidden lg:flex items-center"></div>
          <div className="flex items-center">
            <Link to={'/cart'} className="relative">
              <img src="/assets/cart.svg" alt="cart" className="w-8 h-7 mr-4 " />
              {cartItemsCount > 0 && (
                <p className="absolute rounded-full w-4 h-4 text-xs font-bold text-center bg-red-500 right-1/4 top-0 text-white">
                  {cartItemsCount}
                </p>
              )}
            </Link>
            {userData != null ? (
              <>
                <Link className="mr-4 flex items-center" to={`/profile`}>
                  <img className="w-10 h-10 mr-2 rounded-full" src={userData.photo} alt={userData.first_name} />
                </Link>
                <button className="hidden lg:block" onClick={() => handleLogout()}>
                  logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={'/signin'}
                  className="hidden lg:block bg-white shadow-sm rounded-md px-3 py-1 mr-2 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to={'/signup'}
                  className="hidden lg:block bg-white shadow-sm rounded-md px-3 py-1 hover:bg-gray-100"
                >
                  Register
                </Link>
              </>
            )}
            <button onClick={() => setShowMenu((s) => !s)}>
              <img src="/assets/menu.svg" alt="menu" className="w-8 h-8 lg:hidden" />
            </button>
          </div>
        </div>
      </div>
      {showMenu && (
        <div
          className="bg-nc pl-4 font-medium text-gray-600 text-lg flex flex-col lg:hidden"
          onClick={() => setShowMenu(false)}
        >
          {!userData && (
            <>
              <Link to={'/signin'} className="py-2 font-bold text-purple">
                Login
              </Link>
              <Link to={'/signup'} className="py-2 font-bold text-purple">
                Register
              </Link>
            </>
          )}
          <Link to={'/'} className="py-2">
            Home
          </Link>
          <Link to={'/books/all'} className="py-2">
            Books
          </Link>
          <Link to={'/categories'} className="py-2">
            Categories
          </Link>
          {userData && (
            <button className="py-2 w-fit font-medium text-gray-600" onClick={() => handleLogout()}>
              logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
