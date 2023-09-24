import "./SideBar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import NonFriends from "../NonFriends/NonFriends";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, removeLoading } from "../../redux-toolkit/userSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  let [friends, setFriends] = useState([]);
  let [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      dispatch(setLoading());
      const res = await axios.get("http://localhost:5000/api/v1/user");
      setUsers(res.data);
      const res1 = await axios.get(
        `http://localhost:5000/api/v1/user/${currentUserId}`
      );
      setFriends(res1.data.friends);
      dispatch(removeLoading());
    };
    getAllUsers();
  }, []);

  let nonUsersFriendsIds = [];
  users = users.filter((item) => item._id !== currentUserId);
  users.forEach((item) => {
    if (!friends.includes(item._id)) {
      nonUsersFriendsIds.push(item._id);
    }
  });

  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        <ul className="sideBarList">
          <li className="sideBarListItem">
            <RssFeed className="sideBarIcon" />
            <span className="sideBarListItemText">Feed</span>
          </li>
          <li className="sideBarListItem">
            <Chat className="sideBarIcon" />
            <span className="sideBarListItemText">Chats</span>
          </li>
          <li className="sideBarListItem">
            <PlayCircleFilledOutlined className="sideBarIcon" />
            <span className="sideBarListItemText">Videos</span>
          </li>
          <li className="sideBarListItem">
            <Group className="sideBarIcon" />
            <span className="sideBarListItemText">Groups</span>
          </li>
          <li className="sideBarListItem">
            <Bookmark className="sideBarIcon" />
            <span className="sideBarListItemText">Bookmarks</span>
          </li>
          <li className="sideBarListItem">
            <HelpOutline className="sideBarIcon" />
            <span className="sideBarListItemText">Questions</span>
          </li>
          <li className="sideBarListItem">
            <WorkOutline className="sideBarIcon" />
            <span className="sideBarListItemText">Jobs</span>
          </li>
          <li className="sideBarListItem">
            <Event className="sideBarIcon" />
            <span className="sideBarListItemText">Events</span>
          </li>
          <li className="sideBarListItem">
            <School className="sideBarIcon" />
            <span className="sideBarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sideBarButton">Show more</button>
        <hr />
        <h1 className="findFriendsTitle">Find Friends</h1>
        <ul className="sideBarFriendList">
          {nonUsersFriendsIds &&
            nonUsersFriendsIds.map((item) => (
              <NonFriends key={item} nonUserFriendsid={item} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
