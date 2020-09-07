import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext(); // Create context gives us a provider and a consumer.  So AuthContext.Provider is used below. And the consumer is used in App.js

const AuthProvider = (props) => {
  const { children } = props; //destructuring children props. HERE CHILDREN IS GOING TO BE THE APP COMPONENT
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // bool to maintain isAppLoaded..cause we are going to make a call to the server

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }} //These values will be avaialable in global state
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default AuthProvider;
