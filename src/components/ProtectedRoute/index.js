import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isUserLoggedIn} from "../../reducers/auth.reducer";
import routes from "../../routes";

export const ProtectedRoute = ({ component: Component, isPublic, ...rest }) => (
  <Route {...rest} render={props => {
    if (!isPublic && !isUserLoggedIn()) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: routes.getLoginPath(), state: { from: props.location } }} />
    }

    // authorised so return component
    return <Component {...props} />
  }} />
);
