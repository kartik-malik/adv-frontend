import { createContext, useState } from "react";
const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  logout: () => {},
  login: (user) => {},
  user: null,
  setUser: () => {},
});
export const AuthContextProvider = (props) => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const logOutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loginToken", token);
    setToken(null);
    setUser(null);
  };
  const loginHandler = ({ name, email, id, token }) => {
    setIsLoggedIn(true);
    setToken(token);
    console.log(id);
    setUser({ name, email, id });
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
