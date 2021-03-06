import useHttp from "../hooks/useHttp";
import classes from "../advertisement/Advertisement.module.css";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import AuthContext from "../../providers/AuthProvider";
import AdCard from "../AdCard";
import { Link } from "react-router-dom";
const UserAdsPage = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const [ads, setAds] = useState([]);
  const { isLoading, error, sendRequest: getUserAds } = useHttp();
  const apiConfig = {
    url: `${BASE_URL}/ad/user/${params.userId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${authCtx.token}`,
    },
  };
  console.log(ads);
  useEffect(() => {
    getUserAds(apiConfig, (res) => {
      setAds(res.data);
    });
  }, []);
  // console.log({ iloading });
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <Link to="/createad" className={classes.addButton}>
        Create Ad{" "}
      </Link>
      {ads.length > 0 ? (
        <section className={`${classes.adcontainer}`}>
          {ads.map((ad) => {
            return (
              <AdCard
                key={ad.id}
                title={ad.title}
                id={ad.id}
                imageUrl={ad.imageUrl}
              />
            );
          })}
        </section>
      ) : (
        "No ads by you"
      )}
    </>
  );
};
export default UserAdsPage;
