import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useHttp from "../components/hooks/useHttp";
import { BASE_URL } from "../constants";
import AuthContext from "../providers/AuthProvider";
import AdvertisementForm from "./AdvertiseMentForm";
import classes from "./AdvertisementForm.module.css";
const AdvertisementEditPage = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const { isLoading, sendRequest, error } = useHttp();
  const [adData, setAdData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    sendRequest(
      { url: `${BASE_URL}/ad/${params.productId}`, method: "GET" },
      (data) => {
        setAdData(data);
      }
    );
  }, []);
  const config = {
    url: `${BASE_URL}/ad/user/${authCtx.user.id}/${params.productId}`,
    method: "PUT",
    "Content-Type": "application/json",
    authorization: `Bearer ${authCtx.token}`,
  };
  const editAdvertisementHandler = ({
    title,
    description,
    price,
    imageUrl,
    publishStatus,
  }) => {
    console.log({ title, description, price, imageUrl, publishStatus });
    sendRequest(
      {
        ...config,
        body: {
          title,
          imageUrl,
          description,
          price,
          publishStatus,
          userId: authCtx.user.id,
        },
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authCtx.token}`,
        },
      },
      (data) => {
        alert("updated Succesfully");
        navigate("/");
      }
    );
  };
  if (isLoading) {
    return <p>Loading ... </p>;
  }
  return (
    !isLoading &&
    adData && (
      <div className={classes.formContainer}>
        <AdvertisementForm
          submitHandler={editAdvertisementHandler}
          title={adData.title}
          description={adData.title}
          imageUrl={adData.imageUrl}
          price={adData.price}
          publishStatus={adData.publishStatus}
        />
      </div>
    )
  );
};
export default AdvertisementEditPage;
