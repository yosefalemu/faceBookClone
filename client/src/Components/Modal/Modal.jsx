import "./Modal.css";
import { closeModal } from "../../redux-toolkit/ModalSlice";
import { logOutUser } from "../../redux-toolkit/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountCircle } from "@mui/icons-material";
import { CancelOutlined } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import SendIcon from "@mui/icons-material/Send";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { getUserProfile } from "../../redux-toolkit/userSlice";
import { removeUnViewedMessages } from "../../redux-toolkit/ChatSlice";
import axios from "axios";
const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.currentUser._id);

  const handleLogOut = () => {
    dispatch(closeModal());
    dispatch(logOutUser());
    dispatch(removeUnViewedMessages());
    navigate("/");
    updateOnline();
  };
  const updateOnline = async () => {
    const online = false;
    await axios.patch(`http://localhost:5000/api/v1/user/${id}`, {
      online,
    });
  };
  const handleGetUserProfile = () => {
    dispatch(getUserProfile(id));
    dispatch(closeModal());
    navigate(`/profile/${id}`);
  };
  const handleGetUserFriends = () => {
    navigate("/friends");
    dispatch(closeModal());
  };
  const handleGetUserFollowers = () => {
    navigate("/followers");
    dispatch(closeModal());
  };
  const handleGetUserFollowings = () => {
    navigate("/followings");
    dispatch(closeModal());
  };
  const handleChatWithFriends = () => {
    navigate("/messenger");
    dispatch(closeModal());
  };
  return (
    <aside className="modal-container">
      <div className="modal">
        <div className="contentContainer">
          <div className="eachItemContainer" onClick={handleGetUserProfile}>
            <AccountCircle style={{ color: "gray" }} className="eachIcon" />
            <span>Get Profile</span>
          </div>
          <div className="eachItemContainer" onClick={handleGetUserFriends}>
            <AccountCircle style={{ color: "gray" }} className="eachIcon" />
            <span>Friends</span>
          </div>
          <div className="eachItemContainer" onClick={handleChatWithFriends}>
            <AccountCircle style={{ color: "gray" }} className="eachIcon" />
            <span>Chat with friends</span>
          </div>
          <div className="eachItemContainer" onClick={handleGetUserFollowers}>
            <AccountCircle style={{ color: "gray" }} className="eachIcon" />
            <span>Followers</span>
          </div>
          <div className="eachItemContainer" onClick={handleGetUserFollowings}>
            <AccountCircle style={{ color: "gray" }} className="eachIcon" />
            <span>Followings</span>
          </div>
          <div className="eachItemContainer">
            <SettingsIcon style={{ color: "gray" }} className="eachIcon" />
            <span>Setting</span>
          </div>
          <div className="eachItemContainer" onClick={handleLogOut}>
            <LogoutIcon style={{ color: "red" }} className="eachIcon" />
            <span style={{ color: "red" }}>Log Out</span>
          </div>
          <div
            className="eachItemContainer"
            onClick={() => dispatch(closeModal())}
          >
            <CancelOutlined className="eachIcon" style={{ color: "gray" }} />
            <span>cancel</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
