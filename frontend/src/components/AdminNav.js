import React, { useState } from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import { handleLogout } from '../services/UserRegistirationServices';

const AdminNav = () => {
  let { url } = useRouteMatch();
  const [hidden, IsHidden] = useState(true);
  const changeClass = () => {
    hidden ? IsHidden(false) : IsHidden(true);
  };
  return (
    <header className="bg-mc" data-testid="navbar">
      <div className="h-16 flex items-center justify-between pl-6 pr-6 lg:pl-8 lg:pr-16">
        <Link to="/admin" className="text-lg lg:text-xl text-white font-bold">
          Book House Admin
        </Link>
        <div className="flex items-center gap-4 align-middle">
          <button onClick={() => handleLogout()} className="text-white  font-bold">
            Logout
          </button>
          <div className="md:hidden mr-4 flex items-center ">
            <svg
              onClick={changeClass}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>
      <div className={hidden ? 'hidden' : 'flex gap-3 justify-center md:hidden'}>
        <NavLink className="text-white p-2" to={`${url}/books`} activeClassName="bg-white text-mc rounded-t-md">
          Books
        </NavLink>
        <NavLink className="text-white p-2" to={`${url}/categories`} activeClassName="bg-white text-mc rounded-t-md">
          Categories
        </NavLink>
        <NavLink to={`${url}/orders`} className="text-white p-2" activeClassName="bg-white text-mc rounded-t-md">
          Orders
        </NavLink>
      </div>
    </header>
  );
};

export default AdminNav;
