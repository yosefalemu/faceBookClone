import { useState } from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { loginStart, loginFail } from "../../redux-toolkit/userSlice";
import { useDispatch } from "react-redux";
import { setNumberOfFriendRequest } from "../../redux-toolkit/userSlice";
import axios from "axios";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      await axios.post("http://localhost:5000/api/v1/user/register", {
        name,
        username,
        email,
        password,
        confirmPassword,
      });
      // dispatch(loginSuccess(res.data));
      dispatch(setNumberOfFriendRequest(0));
      setIsEmailSent(true);
      // navigate("/basicinformation");
    } catch (error) {
      setErrorMessage(error.response.data.msg.split(",")[0]);
      dispatch(loginFail());
    }
  };

  return (
    <div className="Register">
      <div className="RegisterWrapper">
        <div className="RegisterLeft">
          <h3 className="RegisterLogo">JossySocial</h3>
          <span className="RegisterDesc">
            Connect with friends and world around you on the JossySocial
          </span>
        </div>
        <div className="RegisterRight">
          {errorMessage && <h3 className="errorComponent">{errorMessage}</h3>}
          <div className="RegisterBox">
            <input
              type="text"
              placeholder="Name"
              className="RegisterInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errorMessage === "please provide the name" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            {errorMessage === "name must be minimum length of 3" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            {errorMessage === "name must be maximum length of 50" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}

            <input
              type="text"
              placeholder="Username"
              className="RegisterInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errorMessage === "please provide the username" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            {errorMessage === "username must be minimum lenght of 6" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            {errorMessage === "username taken" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            <input
              type="email"
              placeholder="Email"
              className="RegisterInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage === "please provide the email" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            {errorMessage === "please provide valid email" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            {errorMessage === "email taken" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            <input
              type="password"
              placeholder="Password"
              className="RegisterInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage === "please provide the password" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            {errorMessage === "password must be minimum length of 6" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            <input
              type="password"
              placeholder="Password Again"
              className="RegisterInput"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage === "passwords doesnot match" ? (
              <div className="errorOccured">{errorMessage}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
            <button className="RegisterButton" onClick={createAccount}>
              Sign Up
            </button>
            <button className="RegisterCreate">
              <Link
                Link
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                Log into Account
              </Link>
            </button>
          </div>
          {isEmailSent && (
            <h3 className="emailsent">
              Verification link is send to your gmail account
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
