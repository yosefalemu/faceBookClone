import "./FriendsPage.css";
import NavBar from "../../Components/NavBar/NavBar";
import Modal from "../../Components/Modal/Modal";
import SideBar from "../../Components/SideBar/SideBar";
import RightBar from "../../Components/RightBar/RightBar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FriendsList from "../../Components/FriendsList/FriendsList";
import axios from "axios";

const FriendsPage = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchUserFriends = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${currentUserId}`
      );
      setFriends(res.data.friends);
    };
    fetchUserFriends();
  }, []);

  return (
    <div className="friendsListPage">
      <NavBar />
      <div className="friendListWrapper">
        {isOpen && <Modal />}
        <SideBar />
        <div className="friendListContainer">
          <h1 className="friendListTitle">Your Friends</h1>
          <ul className="friendList">
            {friends.map((item) => {
              return <FriendsList userId={item} />;
            })}
          </ul>
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default FriendsPage;
