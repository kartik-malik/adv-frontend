import classes from "./Comments.module.css";

const CommentsList = ({ text, user }) => {
  return (
    <li className={classes.commentInfo}>
      <span>{text}</span>{" "}
      <span className={classes.commentuserName}>{user.name}</span>
    </li>
  );
};
export default CommentsList;
