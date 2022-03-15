import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || null;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userData && userData.role === 'admin') {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: '/' }} />;
        }
      }}
    />
  );
};

export default AdminRoute;
