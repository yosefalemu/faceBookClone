import React, { useEffect } from "react";
import "./Feed.css";
import Share from "../Share/Share";
import Post from "../PostPage/Post";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, removeLoading } from "../../redux-toolkit/userSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      dispatch(setLoading());
      const res = await axios.get("http://localhost:5000/api/v1/post");
      setPosts(res.data);
      dispatch(removeLoading());
    };
    fetchPost();
  }, [posts.length]);
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div className="feedBar">
      <Share />
      {posts.map((item) => {
        return <Post key={item._id} post={item} />;
      })}
    </div>
  );
};

export default Feed;
