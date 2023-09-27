import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VerificationPage.css";
import { loginSuccess } from "../../redux-toolkit/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerificationPage = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [validUrl, setValidUrl] = useState(true);
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user/${param.id}/verifyemail/${param.token}`
        );
        dispatch(loginSuccess(res.data));
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, []);
  const handleLogIn = () => {
    navigate("/basicinformation");
  };

  return validUrl ? (
    <div className="verifycontainer">
      <div className="verifywrapper">
        <div className="imgcontainer">
          <img src={`${PF}verify.jpg`} alt="" className="verifyimage" />
        </div>
        <button className="loginbutton" onClick={handleLogIn}>
          Continue
        </button>
      </div>
    </div>
  ) : (
    <h1>not found</h1>
  );
};

export default VerificationPage;
