import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import classes from "./Adview.module.css";
import useHttp from "../components/hooks/useHttp";
import { BASE_URL } from "../constants";
import AuthContext from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import AllComments from "../comments/AllComments";
const Adview = ({}) => {
  const authCtx = useContext(AuthContext);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [advertisement, setadData] = useState(null);
  const {
    isLoading: loadingAdData,
    error,
    sendRequest: loadFeature,
  } = useHttp();
  const deleteConfig = {
    url: `${BASE_URL}/ad/user/${authCtx.user.id}/${productId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${authCtx.token}`,
    },
  };
  useEffect(() => {
    loadFeature(
      { url: `${BASE_URL}/ad/${productId}`, method: "GET" },
      (data) => {
        setadData(data);
      }
    );
  }, []);
  console.log({ loadingAdData });
  if (loadingAdData) {
    return <p>Loading</p>;
  }
  const deleteAdvertisement = () => {
    loadFeature(deleteConfig, () => {
      alert("Deleted Succesfully");
      navigate("/");
    });
  };
  return (
    !loadingAdData &&
    !!advertisement && (
      <div>
        <img src={advertisement.imageUrl} className={classes.image}></img>
        <div>{advertisement.title}</div>
        <p>{advertisement.description}</p>
        <p>Posted By {advertisement.user.name}</p>
        {authCtx.isLoggedIn && advertisement.user.id == authCtx.user.id && (
          <div>
            <Link to={`/editad/${productId}`} className={classes.editButton}>
              Edit
            </Link>
            <button
              onClick={deleteAdvertisement}
              className={classes.deleteButton}
            >
              Delete
            </button>
          </div>
        )}
        {authCtx.isLoggedIn && <AllComments />}
      </div>
    )
  );
};
export default Adview;
