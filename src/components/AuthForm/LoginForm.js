import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import AuthContext from "../../providers/AuthProvider";
import useHttp from "../hooks/useHttp";
import classes from "./AuthForm.module.css";
const LoginForm = () => {
  const switchAuthModeHandler = () => {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, sendRequest: signInRequest, setError } = useHttp();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  // if (authCtx.isLoggedIn) {
  //   navigate("/");
  // }
  const submitHandler = (e) => {
    e.preventDefault();
    signInRequest(
      {
        url: `${BASE_URL}/user/signin`,
        method: "POST",
        body: { email, password },
      },
      (data) => {
        console.log({ data });
        authCtx.login(data);
        navigate("/");
      }
    );
  };

  return (
    <section className={classes.auth}>
      <h1>{"Login"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{"Login"}</button>
          <Link to="/signup" className={classes.toggle}>
            {"Create new account"}
          </Link>
        </div>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default LoginForm;
