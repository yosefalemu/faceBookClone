import "./FriendRequestPage.css";
import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/SideBar/SideBar";
import RightBar from "../../Components/RightBar/RightBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FriendRequest from "../../Components/FriendRequest/FriendRequest";
import Modal from "../../Components/Modal/Modal";

const FriendRequestPage = () => {
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const deleteRequest = useSelector((state) => state.user.deleteRequest);
  const isOpen = useSelector((state) => state.modal.isOpen);
  let [request, setRequest] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/request/${currentUserId}`
        );
        setRequest(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequest();
  }, [deleteRequest]);

  console.log("friend request");
  const requestSenders = [];
  request.forEach((item) =>
    requestSenders.push({ senderId: item.senderId, requestId: item._id })
  );

  return (
    <div className="friendRequest">
      <NavBar />
      <div className="friendRequestWrapper">
        {isOpen && <Modal />}
        <SideBar />
        <div className="friendRequestContainer">
          <h1 className="friendRequestTitle">Friend Request</h1>
          <ul className="friendRequestList">
            {requestSenders.map((item) => {
              return (
                <FriendRequest
                  senderId={item.senderId}
                  requestId={item.requestId}
                />
              );
            })}
          </ul>
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default FriendRequestPage;
