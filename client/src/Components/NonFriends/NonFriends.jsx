import "./NonFriends.css";
import { getUserProfile } from "../../redux-toolkit/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CloseFriends = ({ nonUserFriendsid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nonUserFriend, setNonUserFriend] = useState({});
  useEffect(() => {
    const fetchNonUsers = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${nonUserFriendsid}`
      );
      setNonUserFriend(res.data);
    };
    fetchNonUsers();
  }, []);
  const fetchEachUser = (id) => {
    dispatch(getUserProfile(id));
    navigate(`/profile/${id}`);
  };
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div
      className="sideBarFriendListItem"
      onClick={() => fetchEachUser(nonUserFriend._id)}
    >
      <img
        className="SideBarFriendImage"
        src={`${PF}${nonUserFriend.profilepicture}`}
        alt=""
      />
      <span className="sideBarFriendName">{nonUserFriend.name}</span>
    </div>
  );
};

export default CloseFriends;
