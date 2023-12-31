//used to allow access to certain routes such as dashboard only if the user is logged in
//if the token is not null, then return the children, otherwise redirect to the login page

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (token !== null) return children;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;
