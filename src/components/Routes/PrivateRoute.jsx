import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute(isAuthenticated, Component, ...rest) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        isAuthenticated ? (
          <Component />
        ) : (
          <Redirect to={{ patname: "/", from: location }} />
        );
      }}
    />
  );
}
