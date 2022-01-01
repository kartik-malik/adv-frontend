import { useContext } from "react";
import { useNavigate } from "react-router";
import useHttp from "../components/hooks/useHttp";
import { BASE_URL } from "../constants";
import AuthContext from "../providers/AuthProvider";
import AdvertisementForm from "./AdvertiseMentForm";
import classes from "./AdvertisementForm.module.css";
const AdvertisementCreatePage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const config = {
    url: `${BASE_URL}/ad`,
    method: "POST",
  };
  const addAdvertisementHandler = ({
    title,
    description,
    price,
    imageUrl,
    publishStatus,
  }) => {
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
      () => {
        alert("Created Succesfully");
        navigate("/");
      }
    );
    console.log({ title, description, price, imageUrl });
  };
  return (
    <div className={classes.formContainer}>
      <AdvertisementForm submitHandler={addAdvertisementHandler} />
    </div>
  );
};
export default AdvertisementCreatePage;
