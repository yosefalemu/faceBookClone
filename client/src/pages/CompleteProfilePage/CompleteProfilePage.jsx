import "./CompleteProfilePage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserProfilePicture,
  setLoading,
  removeLoading,
} from "../../redux-toolkit/userSlice";
import axios from "axios";

const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phonenumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [profilepicture, setProfilePicture] = useState("");
  const [coverpicture, setCoverPicture] = useState("");
  const [descripition, setDescripition] = useState("");
  const [relationship, setRelationship] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const currentUserId = useSelector((state) => state.user.currentUser._id);

  useEffect(() => {
    const getSingleUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/${currentUserId}`
      );
      setPhoneNumber(res.data.phonenumber);
      setGender(res.data.gender);
      setDescripition(res.data.descripition);
      setRelationship(res.data.relationship);
      setCountry(res.data.address.country);
      setCity(res.data.address.city);
      setPostalCode(res.data.address.postalcode);
      setCoverPicture(res.data.coverpicture);
      setProfilePicture(res.data.profilepicture);
    };
    getSingleUser();
  }, []);
  console.log("in completeprofile");

  const uploadFileHandlerProfile = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/upload",
        formData
      );
      setProfilePicture(data);
      dispatch(setUserProfilePicture(data));
    } catch (error) {
      console.error("Error uploading profile picture", error);
    }

    return false;
  };
  const uploadFileHandlerCover = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/upload",
        formData
      );
      setCoverPicture(data);
    } catch (error) {
      console.error("Error uploading cover picture", error);
    }

    return false;
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/user/allupdate/${currentUserId}`,
        {
          phonenumber,
          gender,
          profilepicture,
          coverpicture,
          descripition,
          relationship,
          country,
          city,
          postalcode,
        }
      );
      navigate(`/profile/${currentUserId}`);
      dispatch(removeLoading());
    } catch (error) {
      dispatch(removeLoading());
    }
  };

  return (
    <div className="completeProfileContainer">
      <div className="completeProfileWrapper">
        <h1 className="completeProfileTitle">Complete Your Profile</h1>
        <div className="eachCompleteProfileItem">
          <label className="completeProfileLabel">Phone Number</label>
          <input
            type="text"
            placeholder={phonenumber ? phonenumber : "Phone Number"}
            className="completeProfileInput"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="eachCompleteProfileItem">
          <label className="completeProfileLabel">Gender</label>
          <select
            name=""
            id=""
            disabled
            className="completeProfileInput"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="notInterested">Not Interested</option>
          </select>
        </div>
        <div className="eachCompleteProfileItem">
          <label className="completeProfileLabel">Profile Picture</label>
          <input
            type="file"
            className="completeProfileInput"
            onChange={uploadFileHandlerProfile}
          />
        </div>
        <div className="eachCompleteProfileItem">
          <label className="completeProfileLabel">Cover Picture</label>
          <input
            type="file"
            className="completeProfileInput"
            onChange={uploadFileHandlerCover}
          />
        </div>
        <div className="eachCompleteProfileItem">
          <label className="completeProfileLabel">Descripition</label>
          <input
            type="text"
            placeholder={
              descripition
                ? descripition
                : "Describe your self or put your feeling"
            }
            className="completeProfileInput"
            onChange={(e) => setDescripition(e.target.value)}
          />
        </div>
        <div className="eachCompleteProfileItem">
          <label className="completeProfileLabel">Status</label>
          <select
            name=""
            id=""
            className="completeProfileInput"
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="">Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="relationship">Relationship</option>
          </select>
        </div>
        <div className="eachCompleteProfileItem">
          <label className="completeProfileLabel">Country</label>
          <input
            type="text"
            placeholder={country ? country : "Country"}
            className="completeProfileInput"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="eachCompleteProfileItem">
          <label className="completeProfileLabel">City</label>
          <input
            type="text"
            placeholder={city ? city : "City"}
            className="completeProfileInput"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="eachCompleteProfileItem">
          <label className="completeProfileLabel">Postal Code</label>
          <input
            type="text"
            placeholder={postalcode ? postalcode : "Postal Code"}
            className="completeProfileInput"
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="completeProfileButtonContainer">
          <button
            type="submit"
            className="completeProfileButton"
            onClick={handleCompleteProfile}
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
