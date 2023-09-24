import "./Post.css";
import {
  MoreVert,
  ThumbDown,
  ThumbUp,
  ShareOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import {
  setLoading,
  removeLoading,
  getUserProfile,
} from "../../redux-toolkit/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { openCommentModal } from "../../redux-toolkit/CommentModal";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const [like, setLike] = useState(post.like.length);
  const [isLiked, setIsLiked] = useState(post.like.includes(currentUserId));
  const [dislike, setDislike] = useState(post.dislike.length);
  const [isDisliked, setIsDisliked] = useState(
    post.dislike.includes(currentUserId)
  );
  const [comment, setComment] = useState(post.comment.length);
  const [profilepicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchEachPostUser = async () => {
      dispatch(setLoading());
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${post.userId}`
      );
      setProfilePicture(res.data.profilepicture);
      setName(res.data.name);
      dispatch(removeLoading());
    };
    fetchEachPostUser();
  }, [profilepicture, comment]);
  const handleLikeClick = async (id) => {
    await axios.patch(`http://localhost:5000/api/v1/post/like/${id}`, {
      currentUserId,
    });
    isLiked ? setLike(like - 1) : setLike(like + 1);
    setIsLiked(!isLiked);
  };
  const handleDislikeClick = async (id) => {
    await axios.patch(`http://localhost:5000/api/v1/post/dislike/${id}`, {
      currentUserId,
    });
    isDisliked ? setDislike(dislike - 1) : setDislike(dislike + 1);
    setIsDisliked(!isDisliked);
  };

  const handleGetFriendsDetail = async (id) => {
    dispatch(getUserProfile(id));
    navigate(`/profile/${id}`);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImage"
              src={`${PF}${profilepicture}`}
              alt=""
              onClick={() => handleGetFriendsDetail(post.userId)}
            />
            <span className="postUserName">{name}</span>
            <span className="PostDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post?.descripition}:</div>
          <img className="postImage" src={`${PF}${post.image}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomEach">
            <div
              className="postBottomIcon"
              onClick={() => handleLikeClick(post._id)}
            >
              <ThumbUp className="postIcon" htmlColor="blue" />
              <span>{`${like} likes`}</span>
            </div>
            <div
              className="postBottomIcon"
              onClick={() => handleDislikeClick(post._id)}
            >
              <ThumbDown className="postIcon" htmlColor="red" />
              <span>{`${dislike} dislike`}</span>
            </div>
          </div>
          <div className="postBottomEach">
            <span>{`${comment} comments`}</span>
            <button
              className="postCommentButton"
              onClick={() => {
                dispatch(openCommentModal(post._id));
                setComment(comment + 1);
              }}
            >
              comment
            </button>
          </div>
          <div className="postBottomShare">
            <span className="shareName">share</span>
            <ShareOutlined
              style={{ fontWeight: "", fontSize: "24px", color: "green" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
