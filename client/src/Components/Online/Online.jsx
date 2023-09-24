import "./Online.css";

const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightBarOnlineFriend">
      <div className="rightBarProfileImgContainer">
        <img
          className="rightBarOnlineFriendImg"
          src={`${PF}${user.profilepicture}`}
          alt=""
        />
        <span className="rightBarOnline"></span>
      </div>
      <span className="rightBarOnlineFriendName">{user.name}</span>
    </li>
  );
};

export default Online;
