import "./BasicInformation.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setUserGender,
  removeLoading,
} from "../../redux-toolkit/userSlice";
import axios from "axios";
import LoadingComponent from "../../Components/Loading/Loading";

const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phonenumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [relationship, setRelationship] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const loading = useSelector((state) => state.user.loading);

  const handleBasicProfile = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      await axios.patch(`http://localhost:5000/api/v1/user/${currentUserId}`, {
        phonenumber,
        gender,
        relationship,
        country,
        city,
        postalcode,
      });
      dispatch(setUserGender(gender));
      navigate("/additionalinformation");
      dispatch(removeLoading());
    } catch (error) {
      dispatch(removeLoading());
      setErrorMessage(error.response.data.msg);
    }
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <div className="basicProfileContainer">
      <div className="basicProfileWrapper">
        <h1 className="basicProfileTitle">Basic Information</h1>
        {errorMessage && (
          <h3 className="basicErrorComponent">{errorMessage}</h3>
        )}
        <div className="eachbasicProfileItem">
          <label className="basicProfileLabel">Phone Number</label>
          <div className="inputBox">
            <input
              type="text"
              placeholder={"Phone Number"}
              className="basicProfileInput"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errorMessage === "phone number required" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="eachbasicProfileItem">
          <label className="basicProfileLabel">Gender</label>
          <div className="inputBox">
            <select
              name=""
              id=""
              className="basicProfileInput"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="notInterested">Not Interested</option>
            </select>
            {errorMessage === "please specify your gender" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="eachbasicProfileItem">
          <label className="basicProfileLabel">Status</label>
          <div className="inputBox">
            <select
              name=""
              id=""
              className="basicProfileInput"
              onChange={(e) => setRelationship(e.target.value)}
            >
              <option value="">Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="relationship">Relationship</option>
            </select>
            {errorMessage === "please sepecify your status" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="eachbasicProfileItem">
          <label className="basicProfileLabel">Country</label>
          <div className="inputBox">
            <input
              type="text"
              placeholder={"Country"}
              className="basicProfileInput"
              onChange={(e) => setCountry(e.target.value)}
            />
            {errorMessage === "please specify your country" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="eachbasicProfileItem">
          <label className="basicProfileLabel">City</label>
          <div className="inputBox">
            <input
              type="text"
              placeholder={"City"}
              className="basicProfileInput"
              onChange={(e) => setCity(e.target.value)}
            />
            {errorMessage === "please specify the city" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="eachbasicProfileItem">
          <label className="basicProfileLabel">Postal Code</label>
          <div className="inputBox">
            <input
              type="text"
              placeholder={postalcode ? postalcode : "Postal Code"}
              className="basicProfileInput"
              onChange={(e) => setPostalCode(e.target.value)}
            />
            {errorMessage === "please specify the postalcode" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="basicProfileButtonContainer">
          <button
            type="submit"
            className="basicProfileButton"
            onClick={handleBasicProfile}
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
