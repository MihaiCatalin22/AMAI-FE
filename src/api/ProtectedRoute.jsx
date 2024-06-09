import React from "react";
import { Route, Navigate } from "react-router-dom"
import {useAuth} from "../contexts/authContext";

const ProtectedRoute = ({ element: Component, requiredRoles, ...rest }) => {
    const { isAuthenticated, hasRole } = useAuth();

    //if(!isAuthenticated){
   //     console.log("lol")
   //     console.log(isAuthenticated);
  //    return <Navigate to="/login" />;
  // }
    if(!isAuthenticated && !hasRole(requiredRoles)){
        return <Navigate to="/login" />;
    }

    return <Component/>;
    //return TokenManager.isUserAuthenticated() ? Component : <Navigate to="/login" />;
  };
export default ProtectedRoute