import "./Followers.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../redux-toolkit/userSlice";
import { format as timeAgoFormat } from "timeago.js";
import axios from "axios";

const Followers = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profilepicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");
  const [lastOnline, setLastOnline] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const fetchUserFriendsDetail = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${userId}`
      );
      setProfilePicture(res.data.profilepicture);
      setName(res.data.name);
      setLastOnline(res.data.updatedAt);
    };
    fetchUserFriendsDetail();
  }, []);
  const handleGetFriendsDetail = async (id) => {
    dispatch(getUserProfile(id));
    navigate(`/profile/${userId}`);
  };
  const formattedTimeAgo = timeAgoFormat(lastOnline);
  return (
    <div
      className="friendsListContainer"
      onClick={() => handleGetFriendsDetail(userId)}
    >
      <div className="basicInfoContainer">
        <img
          className="friendsListImage"
          src={`${PF}${profilepicture}`}
          alt=""
        />
        <span className="friemdsListUserName">{name}</span>
      </div>
      <div className="timeController">{`last seen ${formattedTimeAgo}`}</div>
    </div>
  );
};

export default Followers;
