import { useState } from "react";
import classes from "./AdvertisementForm.module.css";
const AdvertisementForm = (props) => {
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [price, setPrice] = useState(props.price || "");
  const [imageUrl, setImageUrl] = useState(props.imageUrl || "");
  const [publishStatus, setPublishStatus] = useState(
    props.publishStatus === false ? false : true
  );
  const [error, setError] = useState("");
  const validateForm = () => {
    if (price == "" || price < 0) {
      setError("Price cant be empty");
      return false;
    }
    if (!title) {
      setError("Title cant be empty");
      return false;
    }
    if (imageUrl.slice(0, 4) != "http") {
      setError("image urlnot valid");
      return false;
    }
    return true;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    console.log({ title, description, price, imageUrl, publishStatus });
    props.submitHandler({ title, description, price, imageUrl, publishStatus });
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Your title</label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="description">Your description</label>
        <textarea
          type="text"
          id="description"
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          required
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          id="imageUrl"
          required
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
      </div>
      <div className={classes.radioContainer}>
        <div className={classes.control}>
          <label htmlFor="publish">Publish</label>
          <input
            id="publish"
            value="publish"
            type="radio"
            checked={publishStatus == true}
            onChange={() => {
              setPublishStatus(true);
            }}
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="unpublish">unpublish</label>
          <input
            id="unpublish"
            value="unpublish"
            type="radio"
            checked={publishStatus == false}
            onChange={() => {
              setPublishStatus(false);
            }}
          ></input>
        </div>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};
export default AdvertisementForm;
