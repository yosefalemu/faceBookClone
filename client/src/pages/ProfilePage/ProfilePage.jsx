import "./ProfilePage.css";
import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/SideBar/SideBar";
import FeedForProfile from "../../Components/FeedForProfile/FeedForProfile";
import RightProfile from "../../Components/RightProfile/RightProfile";
import { useSelector } from "react-redux";
import Modal from "../../Components/Modal/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatSharp } from "@mui/icons-material";
import { Person2 } from "@mui/icons-material";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isOpen } = useSelector((state) => state.modal);
  const userId = useSelector((state) => state.user.userProfileId);
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const gender = useSelector((state) => state.user.currentUser.gender);
  const [name, setName] = useState("");
  const [descripition, setDescripition] = useState("");
  const [profilepicture, setProfilePicture] = useState("");
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  let [coverpicture, setCoverPicture] = useState("");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${userId}`
      );
      setName(res.data.name);
      setDescripition(res.data.descripition);
      setProfilePicture(res.data.profilepicture);
      setCoverPicture(res.data.coverpicture);
      setFriends(res.data.friends);
      setFollowers(res.data.followers);
      setFollowings(res.data.following);
    };
    fetchUser();
  }, [userId, gender]);
  if (!coverpicture) {
    coverpicture = "defaultcoverpicture.jpg";
  }
  const handleStartConversation = async () => {
    const res = await axios.post("http://localhost:5000/api/v1/conversation", {
      senderId: currentUserId,
      recieverId: userId,
    });
    navigate("/messenger");
  };
  return (
    <>
      <NavBar />
      <div className="profile">
        {isOpen && <Modal />}
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileImageContainer">
              <img
                className="profileCoverImage"
                src={`${PF}${coverpicture}`}
                alt=""
              />
              <img
                className="profileUserImage"
                src={`${PF}${profilepicture}`}
                alt=""
              />
            </div>
            <div className="profileUserInfoContainer">
              <h4 className="profileUserName">{name}</h4>
              <span className="profileUserDescription">{descripition}</span>
              <div className="profileUserStatus">
                <div className="profileUserStatusItem">
                  Friends:
                  <span className="ProfileUserStatusValue">
                    {friends.length}
                  </span>
                </div>
                <div className="profileUserStatusItem">
                  Followers:
                  <span className="ProfileUserStatusValue">
                    {followers.length}
                  </span>
                </div>
                <div className="profileUserStatusItem">
                  Following:
                  <span className="ProfileUserStatusValue">
                    {followings.length}
                  </span>
                </div>
                {friends.includes(currentUserId) ? (
                  <>
                    <div className="profileUserStatusItem">
                      <button
                        className="startChatButton"
                        onClick={handleStartConversation}
                      >
                        <ChatSharp className="chatIcon" />
                        <span className="chatButtonText">Send Message</span>
                      </button>
                    </div>
                    <div className="profileUserStatusItem">
                      <button className="viewProfileButton">
                        <Person2 className="chatIcon" />
                        <span className="chatButtonText">
                          View Profile Pictures
                        </span>
                      </button>
                    </div>
                  </>
                ) : followers.includes(currentUserId) ? (
                  <div className="profileUserStatusItem">
                    <button className="viewProfileButton">
                      <Person2 className="chatIcon" />
                      <span className="chatButtonText">
                        View Profile Pictures
                      </span>
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <FeedForProfile />
            <RightProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
