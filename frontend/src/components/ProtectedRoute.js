import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || null;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userData) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: '/' }} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
