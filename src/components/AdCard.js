import { Link } from "react-router-dom";
import classes from "./Adcard.module.css";
const AdCard = ({ imageUrl, title, id, description, user }) => {
  return (
    <div className={classes.adCardMain}>
      <Link to={`/ad/${id}`} style={{ textDecoration: "none" }}>
        <div className={classes.adcardImageContainer}>
          <img
            className={classes.cardImage}
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1640890834020-452e57bb5c3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            }
          ></img>
        </div>
        <div className={classes.adCardTextContainer}>
          <span className={classes.adCardTextContainer__text}>{title}</span>{" "}
        </div>
      </Link>
    </div>
  );
};
export default AdCard;
