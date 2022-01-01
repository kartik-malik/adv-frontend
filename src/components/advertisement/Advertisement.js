import classes from "./Advertisement.module.css";
import React, { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { BASE_URL } from "../../constants";
import AdCard from "../AdCard";
const StartingPageContent = () => {
  const [ads, setAds] = useState([]);
  const { sendRequest, isLoading, error } = useHttp();
  useEffect(() => {
    sendRequest({ url: `${BASE_URL}/ad`, method: "GET" }, setAds);
  }, []);
  console.log(ads);
  return (
    <>
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
    </>
  );
};

export default StartingPageContent;
