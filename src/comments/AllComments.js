import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useHttp from "../components/hooks/useHttp";
import { BASE_URL } from "../constants";
import AddComment from "./AddComment";
import CommentsList from "./CommentContainer";
import AuthContext from "../providers/AuthProvider";
const AllComments = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const params = useParams();
  const [comments, setComments] = useState([]);
  const { loading, error, sendRequest: loadComments } = useHttp();
  useEffect(() => {
    loadComments(
      {
        url: `${BASE_URL}/ad/comment/${params.productId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      (comments) => {
        console.log({ comments });
        setComments(comments);
      }
    );
  }, []);
  const updateComments = () => {
    loadComments(
      {
        url: `${BASE_URL}/ad/comment/${params.productId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      (comments) => {
        console.log({ comments });
        setComments(comments);
      }
    );
  };
  return (
    <>
      <div>
        <h3>Comments</h3>
        {comments.length > 0 && (
          <ul>
            {comments.map((item) => {
              return (
                <CommentsList
                  text={item.text}
                  user={item.user}
                  key={item.id}
                ></CommentsList>
              );
            })}
          </ul>
        )}
        {isLoggedIn && <AddComment updateComments={updateComments} />}
      </div>
    </>
  );
};
export default AllComments;
