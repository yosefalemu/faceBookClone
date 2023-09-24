import "./NavBar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { openModal } from "../../redux-toolkit/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { setUserProfilePicture } from "../../redux-toolkit/userSlice";
import { useEffect } from "react";
import axios from "axios";

const NavBar = () => {
  const dispatch = useDispatch();
  const gender = useSelector((state) => state.user.currentUser.gender);
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const { unViwedMessage } = useSelector((state) => state.chat);
  let profilepicture = useSelector(
    (state) => state.user.currentUser.profilepicture
  );
  if (!profilepicture) {
    if (gender === "male") {
      profilepicture = "defaultmenprofile.avif";
      dispatch(setUserProfilePicture(profilepicture));
    }
    if (gender === "female") {
      profilepicture = "defaultwomenprofile.jpg";
      dispatch(setUserProfilePicture(profilepicture));
    }
  }
  useEffect(() => {
    const updateUserProfilePicture = async () => {
      await axios.patch(
        `http://localhost:5000/api/v1/user/addtionalinfo/${currentUserId}`,
        {
          profilepicture,
        }
      );
    };
    updateUserProfilePicture();
  }, []);
  useEffect(() => {}, [unViwedMessage]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const numberOfRequest = useSelector(
    (state) => state.user.numberOfFriendRequest
  );
  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <div className="navbarContainer">
      <div className="navBarLeft">
        <span className="navBarLogo">JossySocial</span>
      </div>
      <div className="navBarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="search for any post,friend,video"
          />
        </div>
      </div>
      <div className="navBarRight">
        <div className="navBarLinks">
          <span className="navBarLink">
            <Link
              Link
              to="/homepage"
              style={{ textDecoration: "none", color: "white" }}
            >
              Homepage
            </Link>
          </span>
          <span className="navBarLink">
            <Link style={{ textDecoration: "none", color: "white" }}>
              Timelines
            </Link>
          </span>
        </div>
        <div className="navBarIcons">
          <Link Link to="/friendrequest">
            <div className="navBarIcon">
              <Badge badgeContent={numberOfRequest} color="warning">
                <Person className="navIcon" />
              </Badge>
            </div>
          </Link>
          <Link Link to="/messenger">
            <div className="navBarIcon">
              <Badge badgeContent={unViwedMessage} color="warning">
                <Chat className="navIcon" />
              </Badge>
            </div>
          </Link>
          <Link Link to="/friendrequest">
            <div className="navBarIcon">
              <Badge badgeContent={numberOfRequest} color="warning">
                <Notifications className="navIcon" />
              </Badge>
            </div>
          </Link>
        </div>
        <img
          src={`${PF}${profilepicture}`}
          alt=""
          className="navBarImage"
          onClick={handleOpenModal}
        />
      </div>
    </div>
  );
};

export default NavBar;
