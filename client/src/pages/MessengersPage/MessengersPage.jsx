import "./MessengersPage.css";
import NavBar from "../../Components/NavBar/NavBar";
import Conversations from "../../Components/Conversations/Conversations";
import Messages from "../../Components/Messages/Messages";
import ChatOnline from "../../Components/ChatOnline/ChatOnline";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "../../Components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getChat,
  setOneConversationReload,
  decreaseUnViewedMessages,
} from "../../redux-toolkit/ChatSlice";

const MessengersPage = () => {
  const dispatch = useDispatch();
  console.log("in messanger page");
  const [conversations, setConversations] = useState([]);
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const [currentChat, setCurrentChat] = useState("");
  const [messeges, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [unViewedMessages, setUnViewedMessages] = useState([]);
  const [messageView, setMessageView] = useState(false);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const scrollRef = useRef();

  useEffect(() => {
    const getUserConversation = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/conversation/${currentUserId}`
      );
      setConversations(res.data);
    };
    getUserConversation();
  }, [currentChat._id, newMessage, messageView]);
  useEffect(() => {
    const getMessage = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/message/${currentChat?._id}`
      );
      setMessages(res.data);
    };
    getMessage();
  }, [currentChat?._id, newMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messeges]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: currentUserId,
      text: newMessage,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/message",
        message
      );
      setMessages([...messeges, res.data]);
      setNewMessage("");
      dispatch(setOneConversationReload(res.data._id));
      await axios.patch(
        `http://localhost:5000/api/v1/conversation/${currentChat?._id}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewMessage = async (item) => {
    dispatch(getChat(item._id));
    dispatch(decreaseUnViewedMessages(item._id));
    setCurrentChat(item);
    const res = await axios.post(
      `http://localhost:5000/api/v1/message/unview/${item._id}`,
      {
        currentUserId,
        isViewed: false,
      }
    );
    setUnViewedMessages(res.data);
  };
  unViewedMessages?.forEach(async (item) => {
    const res1 = await axios.patch(
      `http://localhost:5000/api/v1/message/${item._id}`,
      { isViewed: true }
    );
    setMessageView(true);
  });

  return (
    <>
      <NavBar />
      <div className="messenger">
        {isOpen && <Modal />}
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            <div className="conversationWrapper">
              {conversations.map((item) => {
                return (
                  <div className="div" onClick={() => handleViewMessage(item)}>
                    <Conversations conversation={item} viewed={messageView} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messeges.map((item) => {
                    return (
                      <div ref={scrollRef}>
                        <Messages
                          message={item}
                          own={item.sender === currentUserId}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder={!newMessage ? "Write something" : newMessage}
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleMessageSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="noConversation">
                <h1>Select conversation and start chat</h1>
              </div>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessengersPage;
