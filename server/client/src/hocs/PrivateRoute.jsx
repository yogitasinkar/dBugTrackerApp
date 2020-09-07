import React, {useContext, useState} from 'react';
import {Route, Redirect} from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


const PrivateRoute = ({component: Component, ...rest }) => {
    
   const { isAuthenticated} = useContext(AuthContext);
    return (
        <Route {...rest} render = {props => {
            
            if (isAuthenticated) {
              return <Component {...props} />;
            }

            return (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: props.location },
                }}
            />
            );

        }}/>
    )
}

export default PrivateRoute
