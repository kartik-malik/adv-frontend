import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  logout: () => {},
  login: (user) => {},
  user: null,
  setUser: () => {},
});
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("loginToken");
  const [token, setToken] = useState(initialToken);
  const [loggedIn, setIsLoggedIn] = useState(token);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (initialToken) {
      const data = jwtDecode(initialToken);
      let date = new Date().getTime();
      console.log(date);
      console.log(data.exp);
      console.log(date - data.iat);
      loginHandler({ ...data, token: initialToken });
    }
  }, []);
  // useEffect(() => {
  //   console.log({ user });
  // }, [user]);
  const logOutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loginToken", token);
    setToken(null);
    setUser(null);
  };
  const loginHandler = ({ name, email, id, token }) => {
    console.log({ loginData: { name, email, id, token } });
    setUser({ name, email, id });
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("loginToken", token);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loggedIn,
        setUser,
        user,
        token,
        logout: logOutHandler,
        login: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
