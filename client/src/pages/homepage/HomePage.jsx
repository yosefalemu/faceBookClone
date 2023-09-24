import NavBar from "../../Components/NavBar/NavBar";
import Feed from "../../Components/Feed/Feed";
import RightBar from "../../Components/RightBar/RightBar";
import SideBar from "../../Components/SideBar/SideBar";
import "./HomePage.css";
import { useSelector } from "react-redux";
import Modal from "../../Components/Modal/Modal";
import LoadingComponent from "../../Components/Loading/Loading";
import axios from "axios";
import { useEffect } from "react";
import CommentModal from "../../Components/CommentModal/CommentModal";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser._id);
  const { isOpen } = useSelector((state) => state.modal);
  const { isCommentModalOpen } = useSelector((state) => state.commentModal);
  useEffect(() => {
    const updateUser = async () => {
      const online = true;
      const res = await axios.patch(`http://localhost:5000/api/v1/user/${id}`, {
        online,
      });
    };
    updateUser();
  }, []);
  console.log("in homepage");
  return (
    <>
      <NavBar />
      <div className="homePageContainer">
        {isOpen && <Modal />}
        {isCommentModalOpen && <CommentModal />}
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
};

export default HomePage;
