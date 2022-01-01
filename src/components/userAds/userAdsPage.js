import useHttp from "../hooks/useHttp";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import AuthContext from "../../providers/AuthProvider";
const UserAdsPage = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const [ads, setAds] = useState([]);
  const { loading, error, sendRequest: getUserAds } = useHttp();
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
  return ads.length > 0
    ? ads.map((item) => {
        return <li key={item.id}>{item.title}</li>;
      })
    : "No posts made by you please make some post";
};
export default UserAdsPage;
