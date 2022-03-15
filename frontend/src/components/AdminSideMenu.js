import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
const AdminSideMenu = () => {
  let { url } = useRouteMatch();

  const style = {
    nav: "bg-mc md:flex flex-col items-start pt-16 hidden md:w-44 lg:w-60",
    default: "px-8 py-4 font-bold text-xl text-white mb-6 md:w-44 lg:w-60",
    active: "bg-white text-purple rounded-l-md",
  };

  return (
    <nav className={style.nav}>
      <NavLink
        to={`${url}/books`}
        className={style.default}
        activeClassName={style.active}
      >
        Books
      </NavLink>

      <NavLink
        to={`${url}/categories`}
        className={style.default}
        activeClassName={style.active}
      >
        Categories
      </NavLink>
      <NavLink
        to={`${url}/orders`}
        className={style.default}
        activeClassName={style.active}
      >
        Orders
      </NavLink>
    </nav>
  );
};

export default AdminSideMenu;
