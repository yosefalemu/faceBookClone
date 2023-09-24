import "./FriendRequest.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseNumberOfFriendRequest,
  getDeleteRequest,
} from "../../redux-toolkit/userSlice";

const FriendRequest = ({ senderId, requestId }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const [profilepicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");
  const [deleteRequest, setDeleteRequest] = useState("");
  const [reload, setReload] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const fetchRequestSenders = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${senderId}`
      );
      setProfilePicture(res.data.profilepicture);
      setName(res.data.name);
    };
    fetchRequestSenders();
  }, [reload]);
  const handleConfirmButton = async (senderId, requestId) => {
    try {
      const recieverId = currentUserId;
      await axios.patch(
        `http://localhost:5000/api/v1/user/addfriend/${currentUserId}`,
        {
          senderId,
        }
      );
      await axios.patch(
        `http://localhost:5000/api/v1/user/addfriend/${senderId}`,
        {
          recieverId,
        }
      );
      const res = await axios.delete(
        `http://localhost:5000/api/v1/request/${requestId}`
      );
      const deleteRequestId = res.data._id;
      dispatch(decreaseNumberOfFriendRequest());
      dispatch(getDeleteRequest(deleteRequestId));
    } catch (error) {}
  };

  const handleCancelRequest = async (requestId) => {
    const res = await axios.delete(
      `http://localhost:5000/api/v1/request/${requestId}`
    );
    const deleteRequestId = res.data._id;
    dispatch(decreaseNumberOfFriendRequest());
    dispatch(getDeleteRequest(deleteRequestId));
  };

  return (
    <li className="friendRequestListItem">
      <div className="friendRequestTop">
        <img
          className="friendRequestImg"
          src={`${PF}${profilepicture}`}
          alt=""
        />
        <h1>{name}</h1>
      </div>
      <div className="friendRequestBottom">
        <button
          className="confirmButton"
          onClick={() => handleConfirmButton(senderId, requestId)}
        >
          confirm
        </button>
        <button
          className="cancelButton"
          onClick={() => handleCancelRequest(requestId)}
        >
          cancel
        </button>
      </div>
    </li>
  );
};

export default FriendRequest;
