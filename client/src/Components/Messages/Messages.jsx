import { useEffect, useState } from "react";
import "./Messages.css";
import { format } from "timeago.js";
import axios from "axios";
import { getUserProfile } from "../../redux-toolkit/userSlice";

const Messages = ({ message, own }) => {
  console.log("in message componenet");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const senderId = message.sender;
  const [profilepicture, setProfilePicture] = useState("");
  useEffect(() => {
    const getSenderProfilePicture = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user/${senderId}`
        );
        setProfilePicture(res.data.profilepicture);
      } catch (error) {
        console.log(error);
      }
    };
    getSenderProfilePicture();
  }, [senderId]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={`${PF}${profilepicture}`} alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Messages;
