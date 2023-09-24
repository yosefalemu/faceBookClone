import React, { useEffect, useState } from "react";
import "./RightBar.css";
import { GifBoxOutlined } from "@mui/icons-material";
import Online from "../Online/Online";
import { useDispatch } from "react-redux";
import { setLoading, removeLoading } from "../../redux-toolkit/userSlice";
import axios from "axios";

const RightBar = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [online, setOnline] = useState(false);
  useEffect(() => {
    const fetchOnlineFriends = async () => {
      dispatch(setLoading());
      const res = await axios.post("http://localhost:5000/api/v1/user/online", {
        online: true,
      });
      setOnline(true);
      setUsers(res.data);
      dispatch(removeLoading());
    };
    fetchOnlineFriends();
  }, []);
  return (
    <div className="rightBar">
      <div className="rightBarWrapper">
        <div className="birthDayContainer">
          <GifBoxOutlined className="birthDayIcon" />
          <span className="birthDayText">
            <b>Binyam Alemu</b> and <b>Other 3 friends</b> have a birthday today
          </span>
        </div>
        <img className="rightBarAd" src="/images/person1.jpg" alt="" />
        <h1 className="rightBarTitle">Online Friends</h1>
        <ul className="rightBarOnlineFriendList">
          {users && users.map((item) => <Online key={item._id} user={item} />)}
        </ul>
      </div>
    </div>
  );
};

export default RightBar;
