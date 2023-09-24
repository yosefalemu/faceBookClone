import { useEffect, useState } from "react";
import "./Conversations.css";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

import axios from "axios";

const Conversations = ({ conversation, viewed }) => {
  console.log("in oconversation component");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const currentChatId = useSelector((state) => state.chat.currentChat);
  const { oneConversationReload } = useSelector((state) => state.chat);
  const friendId = conversation.members.find((item) => item !== currentUserId);
  const [unViewMessage, setUnViewMessage] = useState([]);
  const [conversationMesseges, setConversationMesseges] = useState([]);
  const [lengthOfLastMessage, setLengthOfLastMessage] = useState(null);
  const [user, setUser] = useState({});
  useEffect(() => {
    const getFriend = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user/${friendId}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriend();
  }, [conversation._id]);
  useEffect(() => {
    const getAllNewMessages = async () => {
      const res = await axios.post(
        `http://localhost:5000/api/v1/message/unview/${conversation._id}`,
        {
          isViewed: false,
          currentUserId,
        }
      );
      setUnViewMessage(res.data);
    };
    getAllNewMessages();
  }, [conversation._id, currentChatId]);
  useEffect(() => {
    const getAllConversationMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/message/${conversation._id}`
        );
        setConversationMesseges(res.data);
        setLengthOfLastMessage(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getAllConversationMessages();
  }, [conversation._id, oneConversationReload]);

  const lastMessageText = conversationMesseges[lengthOfLastMessage - 1]?.text;

  return (
    <div className="conversation">
      <div className="conversationTop">
        <img
          src={`${PF}${user?.profilepicture}`}
          alt=""
          className="conversationImage"
        />
        <span className="conversationName">{user?.name}</span>
      </div>
      <div className="conversationMiddle">
        <p className="lastMessage"> {lastMessageText}</p>
      </div>
      <div className="conversationBottom">
        <p>{`${user.username} is online ${format(user.updatedAt)}`}</p>
      </div>
      <div
        className={
          (viewed && currentChatId === conversation._id) ||
          unViewMessage?.length === 0
            ? "noNewMessage"
            : "numberOfUnViewedMessages"
        }
      >
        <div className="numberOfNewMessageText">{unViewMessage.length}</div>
      </div>
    </div>
  );
};

export default Conversations;
