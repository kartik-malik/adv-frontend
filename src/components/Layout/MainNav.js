import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../providers/AuthProvider";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logOut = () => {
    authCtx.logout();
    navigate("/");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {authCtx.isLoggedIn ? (
            <>
              <li>
                <Link to={`/user/ad/${authCtx.user.id}`}>My ads</Link>
              </li>
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
