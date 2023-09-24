import "./Friends.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../redux-toolkit/userSlice";
import axios from "axios";

const Friends = ({ userFriendId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userProfileId);
  const [profilepicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const userFriends = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${userFriendId}`
      );
      setProfilePicture(res.data.profilepicture);
      setName(res.data.name);
    };
    userFriends();
  }, [userId, userFriendId]);

  const handleGetFriendsDetail = async (id) => {
    dispatch(getUserProfile(id));
  };
  return (
    <div
      className="rightProfileContainer"
      onClick={() => handleGetFriendsDetail(userFriendId)}
    >
      <img
        className="rightProfileImage"
        src={`${PF}${profilepicture}`}
        alt=""
      />
      <span className="rightProfileUserName">{name}</span>
    </div>
  );
};

export default Friends;
