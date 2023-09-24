import "./Share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../redux-toolkit/userSlice";
import LoadingComponent from "../Loading/Loading";

const Share = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const [post, setPost] = useState("");
  const [descripition, setDescripition] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const gender = useSelector((state) => state.user.currentUser.gender);
  const username = useSelector((state) => state.user.currentUser.username);
  const loading = useSelector((state) => state.user.loading);
  const placeHolder = `what is in your mind ${username}`;
  let profilepicture = useSelector(
    (state) => state.user.currentUser.profilepicture
  );
  if (!profilepicture) {
    if (gender === "male") {
      profilepicture = "defaultmenprofile.avif";
    } else if (gender === "female") {
      profilepicture = "defaultwomenprofile.jpg";
    }
  }
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handlePostUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/upload",
        formData
      );
      setPost(data);
    } catch (error) {
      console.error("Error uploading cover picture", error);
    }

    return false;
  };
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/post", {
        userId: currentUserId,
        image: post,
        descripition,
      });

      dispatch(getUserProfile(currentUserId));
      navigate(`/profile/${currentUserId}`);
    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <div className="share">
      <div className="shareWrapper">
        {errorMessage && (
          <h3 className="errorShareComponent">{errorMessage}</h3>
        )}
        <div className="shareTop">
          <img className="shareImage" src={`${PF}${profilepicture}`} alt="" />
          <input
            type="text"
            placeholder={placeHolder}
            className="shareInput"
            onChange={(e) => setDescripition(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handlePostUpload}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton" onClick={handleSubmit}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
