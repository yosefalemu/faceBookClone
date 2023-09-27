import "./AdditionalInformation.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserProfilePicture,
  setLoading,
  removeLoading,
} from "../../redux-toolkit/userSlice";
import LoadingComponent from "../../Components/Loading/Loading";
import axios from "axios";

const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profilepicture, setProfilePicture] = useState("");
  const [coverpicture, setCoverPicture] = useState("");
  const [descripition, setDescripition] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const loading = useSelector((state) => state.user.loading);

  const uploadFileHandlerProfile = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/upload",
        formData
      );
      dispatch(removeLoading());
      setProfilePicture(data);
      dispatch(setUserProfilePicture(data));
    } catch (error) {
      dispatch(removeLoading());
      console.error("Error uploading profile picture", error);
    }
    return false;
  };
  const uploadFileHandlerCover = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/upload",
        formData
      );
      dispatch(removeLoading());
      setCoverPicture(data);
    } catch (error) {
      dispatch(removeLoading());
      console.error("Error uploading cover picture", error);
    }
    return false;
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/user/addtionalinfo/${currentUserId}`,
        {
          profilepicture,
          coverpicture,
          descripition,
        }
      );
      navigate("/homepage");
      dispatch(removeLoading());
    } catch (error) {
      dispatch(removeLoading());
      setErrorMessage(error.response.data.msg);
    }
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <div className="additionalProfileContainer">
      <div className="additionalProfileWrapper">
        {errorMessage && <h3 className="errorComponent">{errorMessage}</h3>}
        <h1 className="additionalProfileTitle">Complete Your Profile</h1>
        <div className="eachadditionalProfileItem">
          <label className="additionalProfileLabel">Profile Picture</label>
          <input
            type="file"
            className="additionalProfileInput"
            onChange={uploadFileHandlerProfile}
          />
        </div>
        <div className="eachadditionalProfileItem">
          <label className="additionalProfileLabel">Cover Picture</label>
          <input
            type="file"
            className="additionalProfileInput"
            onChange={uploadFileHandlerCover}
          />
        </div>
        <div className="eachadditionalProfileItem">
          <label className="additionalProfileLabel">Descripition</label>
          <input
            type="text"
            placeholder="Describe your self or put your feeling"
            className="additionalProfileInput"
            onChange={(e) => setDescripition(e.target.value)}
          />
        </div>
        <div className="additionalProfileButtonContainer">
          <button
            type="submit"
            className="additionalProfileButton"
            onClick={handleCompleteProfile}
          >
            Review
          </button>
        </div>
        <Link Link to="/homepage" className="skipCss">
          Skip For Now
        </Link>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
