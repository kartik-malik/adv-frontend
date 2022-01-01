import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";
import useHttp from "../hooks/useHttp";
import classes from "./AuthForm.module.css";
import AuthContext from "../../providers/AuthProvider";
const AuthForm = () => {
  // const submitHandler = () => {};
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, sendRequest: signUpRequest } = useHttp();
  const submitHandler = (e) => {
    e.preventDefault();
    signUpRequest(
      {
        url: `${BASE_URL}/user/signup`,
        method: "POST",
        body: { name, email, password },
      },
      (data) => {
        authCtx.login(data);
      }
    );
  };
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <section className={classes.auth}>
      <h1>{"Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
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
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={classes.actions}>
          {!loading ? (
            <button>{"Create Account"}</button>
          ) : (
            <p>Sending req to server</p>
          )}
          <Link className={classes.toggle} to="/auth">
            {"Login with existing account"}
          </Link>
        </div>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default AuthForm;
