import "./EachComment.css";
import { useEffect, useState } from "react";
import axios from "axios";

const EachComment = ({ userCommentId, commentContent }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profilepicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${userCommentId}`
      );
      setProfilePicture(res.data.profilepicture);
      setName(res.data.name);
    };
    fetchCurrentUser();
  }, []);
  return (
    <div className="commentContainer">
      <div className="basicInfoContainer">
        <img src={`${PF}${profilepicture}`} alt="" className="commentImage" />
        <div className="commentName">{name}</div>
      </div>
      <div className="commentContent">{commentContent}</div>
      <div className="replayButtonContainer">
        <button className="replayButton">replay</button>
      </div>
    </div>
  );
};

export default EachComment;
