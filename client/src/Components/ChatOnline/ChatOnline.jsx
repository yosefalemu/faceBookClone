import "./ChatOnline.css";

const ChatOnline = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriends">
        <div className="chatOnlineImageContainer">
          <img
            src={`${PF}1693746508745_photo_2021-08-16_16-19-23.jpg`}
            alt=""
            className="chatImage"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <div className="chatOnlineName">John Smilga</div>
      </div>
    </div>
  );
};

export default ChatOnline;
