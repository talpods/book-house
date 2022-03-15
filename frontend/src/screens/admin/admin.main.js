import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import AdminNav from "../../components/AdminNav";
import AdminSideMenu from "../../components/AdminSideMenu";
import Books from "./books/books.main";
import Categories from "./categories/Categories.main";
import Orders from "./orders/orders.main";

const Admin = () => {
  let { path } = useRouteMatch();
  return (
    <>
      <div className="h-screen flex flex-col">
        <AdminNav />
        <div className="flex flex-row w-full flex-grow">
          <AdminSideMenu />
          <main className="flex flex-col flex-grow mx-3 md:mx-8 lg:mx-12 2xl:mx-32">
            <Switch>
              <Route path={`${path}/books`} component={Books} />
              <Route path={`${path}/categories`} component={Categories} />
              <Route path={`${path}/orders`} component={Orders} />
              <Redirect to="admin/books" />
            </Switch>
          </main>
        </div>
      </div>
    </>
  );
};

export default Admin;
