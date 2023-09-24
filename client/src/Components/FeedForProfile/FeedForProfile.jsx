import React, { useEffect } from "react";
import "./FeedForProfile.css";
import Post from "../PostPage/Post";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, removeLoading } from "../../redux-toolkit/userSlice";
import axios from "axios";
import LoadingComponent from "../Loading/Loading";

const Feed = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userProfileId);
  const loading = useSelector((state) => state.user.loading);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      dispatch(setLoading());
      const res = await axios.get(
        `http://localhost:5000/api/v1/post/${userId}`
      );
      setPosts(res.data);
      dispatch(removeLoading());
    };
    fetchPost();
  }, [userId]);
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="feedBar">
      {posts.length === 0 ? (
        <div className="noPost">
          <h1>NO POST</h1>
        </div>
      ) : (
        posts.map((item) => {
          return <Post key={item._id} post={item} />;
        })
      )}
    </div>
  );
};

export default Feed;
