import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import classes from "./Adview.module.css";
import useHttp from "../components/hooks/useHttp";
import { BASE_URL } from "../constants";
import AuthContext from "../providers/AuthProvider";
import { Link } from "react-router-dom";
const Adview = ({}) => {
  const authCtx = useContext(AuthContext);
  const { productId } = useParams();
  const [advertisement, setadData] = useState(null);
  const { isLoading, error, sendRequest: loadFeature } = useHttp();
  useEffect(() => {
    loadFeature(
      { url: `${BASE_URL}/ad/${productId}`, method: "GET" },
      (data) => {
        setadData(data);
      }
    );
  }, []);
  console.log({ isLoading });
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    !isLoading &&
    !!advertisement && (
      <div>
        <img src={advertisement.imageUrl} className={classes.image}></img>
        <div>{advertisement.title}</div>
        <p>{advertisement.description}</p>
        <p>Posted By {advertisement.user.name}</p>
        {advertisement.user.id == authCtx.user.id && (
          <div>
            <Link to={`/editad/${productId}`}>Edit</Link>
            <button>Delete</button>
          </div>
        )}
      </div>
    )
  );
};
export default Adview;
