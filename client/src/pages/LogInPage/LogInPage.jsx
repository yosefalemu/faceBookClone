import { useState } from "react";
import "./LogInPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFail,
} from "../../redux-toolkit/userSlice";
import {
  setNumberOfFriendRequest,
  setLoading,
  removeLoading,
  setUserGender,
} from "../../redux-toolkit/userSlice";
import axios from "axios";
import LoadingComponent from "../../Components/Loading/Loading";
import { getUnViewedMessages } from "../../redux-toolkit/ChatSlice";

const LogInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(removeLoading());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userPreviousConversation, setUserPreviousConversation] = useState([]);
  const loading = useSelector((state) => state.user.loading);

  const handleLogIn = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/login", {
        email,
        password,
      });
      const res1 = await axios.get(
        `http://localhost:5000/api/v1/request/${res.data._id}`
      );
      dispatch(loginSuccess(res.data));
      dispatch(setUserGender(res.data.gender));
      dispatch(setNumberOfFriendRequest(res1.data.length));
      const res2 = await axios.get(
        `http://localhost:5000/api/v1/conversation/${res.data._id}`
      );
      setUserPreviousConversation(res2.data);
      console.log(res2.data);
      res2.data.forEach(async (item) => {
        const res3 = await axios.post(
          `http://localhost:5000/api/v1/message/unview/${item._id}`,
          { isViewed: false, currentUserId: res.data._id }
        );
        console.log(res3.data);
        if (res3.data.length > 0) {
          const conversationId = res3.data[0].conversationId;
          const lenOfConversation = res3.data.length;
          dispatch(getUnViewedMessages({ conversationId, lenOfConversation }));
        }

        // count = count + res3.data.length;
      });
      // console.log(count);
      navigate("/homepage");
      dispatch(removeLoading());
    } catch (error) {
      setErrorMessage(error.response.data.msg);
      dispatch(removeLoading());
      dispatch(loginFail());
    }
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">JossySocial</h3>
          <span className="loginDesc">
            Connect with friends and world around you on the JossySocial
          </span>
        </div>
        <div className="loginRight">
          {errorMessage && <h3 className="errorComponent">{errorMessage}</h3>}
          <div className="loginBox">
            <input
              type="text"
              placeholder="Email"
              className="logInInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage === "email required" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
            {errorMessage === "Invalid creditials" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
            <input
              type="password"
              placeholder="Password"
              className="logInInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage === "password required" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
            {errorMessage === "wrong password" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div></div>
            )}
            <button className="logInButton" onClick={handleLogIn}>
              Log In
            </button>
            <span className="logInForget">Forgot Password</span>
            <button className="logInCreate">
              <Link
                Link
                to="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                Create a New Account
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
