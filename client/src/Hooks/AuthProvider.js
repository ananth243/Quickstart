//Scrapped this idea
import React, { createContext, useContext, useRef } from 'react';
import { Route } from 'react-router-dom';
import Login from '../sections/Admin/Login';
import propTypes from 'prop-types';
const AuthContext = createContext();

export function useAuth() {
   return useContext(AuthContext);
}

function AuthProvider({ children }) {
   const auth = useRef(localStorage.getItem('jwt') ? true : false);
   return (
      <AuthContext.Provider value={auth}>
         <Route exact path="/admin">
            <Login />
         </Route>
         {auth.current && children}
         {!auth.current && <div>Sorry you have to login</div>}
      </AuthContext.Provider>
   );
}

AuthProvider.propTypes = {
   children: propTypes.arrayOf(propTypes.element),
};

export default AuthProvider;
