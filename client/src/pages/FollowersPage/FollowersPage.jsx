import "./FollowersPage.css";
import NavBar from "../../Components/NavBar/NavBar";
import Modal from "../../Components/Modal/Modal";
import SideBar from "../../Components/SideBar/SideBar";
import RightBar from "../../Components/RightBar/RightBar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Followers from "../../Components/Followers/Followers";
import axios from "axios";

const FollowersPage = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const fetchUserFollowers = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${currentUserId}`
      );
      setFollowers(res.data.followers);
    };
    fetchUserFollowers();
  }, []);

  return (
    <div className="friendsListPage">
      <NavBar />
      <div className="friendListWrapper">
        {isOpen && <Modal />}
        <SideBar />
        <div className="friendListContainer">
          <h1 className="friendListTitle">Your Followers</h1>
          <ul className="friendList">
            {followers.map((item) => {
              return <Followers userId={item} />;
            })}
          </ul>
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default FollowersPage;
