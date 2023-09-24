import "./RightProfile.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  setLoading,
  removeLoading,
} from "../../redux-toolkit/userSlice";
import Friends from "../Friends/Friends";

const RightProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userProfileId);
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const name = useSelector((state) => state.user.currentUser.name);
  const [user, setUser] = useState({});
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [relationship, setRelationship] = useState("");
  const [profilepicture, setProfilePicture] = useState("");
  const [friends, setFriends] = useState([]);
  const [requestMade, setRequestMade] = useState(false);
  const [userFriend, setUserFriend] = useState([]);
  const [userFollows, setUserFollows] = useState([]);
  const [reload, setReload] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUserDetailInfo = async () => {
      dispatch(setLoading());
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${userId}`
      );
      setUser(res.data);
      setCountry(res.data.address.country);
      setCity(res.data.address.city);
      setPhoneNumber(res.data.phonenumber);
      setGender(res.data.gender);
      setRelationship(res.data.relationship);
      setProfilePicture(res.data.profilepicture);
      setFriends(res.data.friends);
      const res1 = await axios.get(
        `http://localhost:5000/api/v1/user/${currentUserId}`
      );
      setUserFriend(res1.data.friends);
      setUserFollows(res1.data.following);
      dispatch(removeLoading());
    };
    getUserDetailInfo();
  }, [userId, reload]);

  const handleCompleteProfile = () => {
    navigate("/completeprofile");
  };

  const handleAddFriend = async () => {
    try {
      dispatch(setLoading());
      const res = await axios.post("http://localhost:5000/api/v1/request", {
        senderId: currentUserId,
        recieverId: userId,
        senderName: name,
        senderImage: profilepicture,
      });
      setRequestMade(true);
      setReload(!reload);
      dispatch(removeLoading());
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollowUser = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/user/follow/${currentUserId}`,
        {
          recieverId: userId,
        }
      );
      await axios.patch(`http://localhost:5000/api/v1/user/follow/${userId}`, {
        senderId: currentUserId,
      });
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="rightProfile">
      <div className="userInfoContainer">
        <h1 className="userInfoContainerTitle">User Information</h1>
        <div className="userInfoItem">
          <div className="userInfo">Country: </div>
          <span className="userInfoValue">{user && country}</span>
        </div>
        <div className="userInfoItem">
          <div className="userInfo">City: </div>
          <span className="userInfoValue">{user && city}</span>
        </div>
        <div className="userInfoItem">
          <div className="userInfo">Gender: </div>
          <span className="userInfoValue">{user && gender}</span>
        </div>
        <div className="userInfoItem">
          <div className="userInfo">Relationship: </div>
          <span className="userInfoValue">{user && relationship}</span>
        </div>
        <div className="userInfoItem">
          <div className="userInfo">PhoneNumber: </div>
          <span className="userInfoValue">{user && phonenumber}</span>
        </div>
        <div className="userInfoItem">
          {userId === currentUserId ? (
            <button
              className="completeProfileButton"
              onClick={handleCompleteProfile}
            >
              complete profile
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className="userInfoItem">
          {userId !== currentUserId ? (
            <div className="buttonContainer">
              {userFriend.includes(userId) ? (
                ""
              ) : (
                <button
                  className="completeProfileButton"
                  onClick={handleAddFriend}
                >
                  {requestMade ? "Request Send" : "Add Friend"}
                </button>
              )}
              {userFollows.includes(userId) ? (
                ""
              ) : (
                <button
                  className="completeProfileButton"
                  onClick={handleFollowUser}
                >
                  Follow
                </button>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <hr className="seaparationLine" />
      <hr className="seaparationLine" />
      <h1 className="rightProfileTitle">Friends</h1>
      <div className="rightProfileWholeContainer">
        {friends.map((item) => {
          return <Friends userFriendId={item} />;
        })}
      </div>
    </div>
  );
};

export default RightProfile;
