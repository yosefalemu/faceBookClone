import "./CommentModal.css";
import { CancelOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { closeCommentModal } from "../../redux-toolkit/CommentModal";
import { useNavigate } from "react-router-dom";
import EachComment from "../EachComment/EachComment";
import { useEffect, useState } from "react";
import axios from "axios";

const CommentModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const idForComment = useSelector((state) => state.commentModal.idForComment);
  const [commentContent, setCommentContent] = useState("");
  const [previousComments, setPreviousComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/post/getsinglepost/${idForComment}`
      );
      setPreviousComments(res.data.comment);
    };
    fetchPost();
  }, [previousComments.length]);
  const handleAddComment = async () => {
    await axios.patch(
      `http://localhost:5000/api/v1/post/comment/${idForComment}`,
      { currentUserId, commentContent }
    );
    dispatch(closeCommentModal());
    navigate("/homepage");
  };
  previousComments.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <aside className="modalCommentContainer">
      <div className="modalComment">
        <div className="contentContainer">
          <div className="containerForInputAndButton">
            <div className="modalCommentForInput">
              <textarea
                name=""
                id=""
                rows="5"
                type="text"
                placeholder="add your comment"
                className="modalCommentInput"
                onChange={(e) => setCommentContent(e.target.value)}
              ></textarea>
            </div>
            <div className="addCommentButtonContainer">
              <button className="addCommentButton" onClick={handleAddComment}>
                comment
              </button>
            </div>
          </div>
          <div className="wholeCommentContainer">
            {previousComments.map((item) => {
              return (
                <EachComment
                  userCommentId={item.currentUserId}
                  commentContent={item.commentContent}
                />
              );
            })}
            <div
              className="cancelButtonContainer"
              onClick={() => dispatch(closeCommentModal())}
            >
              <CancelOutlined className="eachIcon" style={{ color: "white" }} />
              <span>Close Comment</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CommentModal;
