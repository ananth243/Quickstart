import { createContext, useContext, useRef } from "react";
import { Route } from "react-router-dom";
import Login from "../sections/Admin/Login";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = useRef(false);
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
