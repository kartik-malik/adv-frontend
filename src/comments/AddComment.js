import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import useHttp from "../components/hooks/useHttp";
import { BASE_URL } from "../constants";
import AuthContext from "../providers/AuthProvider";
import classes from "./Comments.module.css";
const AddComment = ({ updateComments }) => {
  const authCtx = useContext(AuthContext);
  const [text, setText] = useState("");
  const [validation, setValidation] = useState();
  const params = useParams();
  const { isLoading, error, sendRequest } = useHttp();
  const checkValidation = () => {
    if (text.trim() == "") {
      setValidation("Text cannot be empty");
      return false;
    }
    return true;
  };
  const addComment = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (!isValid) {
      return;
    }
    setValidation("");
    sendRequest(
      {
        url: `${BASE_URL}/ad/comment/${params.productId}/user/${authCtx.user.id}`,
        method: "POST",
        body: {
          text,
        },
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authCtx.token}`,
        },
      },
      () => {
        alert("Added Succesfully");
        updateComments();
      }
    );
  };
  if (error) {
    alert(error);
  }
  return (
    <form
      onSubmit={addComment}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <input
        type="text"
        className={classes.commentsTextInput}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <button className={classes.commentButton}>Add Comment</button>
      {validation && <p style={{ color: "red" }}>{validation}</p>}
    </form>
  );
};
export default AddComment;
