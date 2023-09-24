import HomePage from "./pages/homepage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LogInPage from "./pages/LogInPage/LogInPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CompleteProfilePage from "./pages/CompleteProfilePage/CompleteProfilePage";
import FriendRequestPage from "./pages/FriendRequestPage/FriendRequestPage";
import BasicInformation from "./pages/BasicInformation/BasicInformation";
import AdditionalInformation from "./pages/AdditionalInformation/AdditionalInformation";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import FollowersPage from "./pages/FollowersPage/FollowersPage";
import FollowingsPage from "./pages/FollowingsPage/FollowingsPage";
import MessengersPage from "./pages/MessengersPage/MessengersPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/completeprofile" element={<CompleteProfilePage />} />
        <Route path="/friendrequest" element={<FriendRequestPage />} />
        <Route path="/basicinformation" element={<BasicInformation />} />
        <Route
          path="/additionalinformation"
          element={<AdditionalInformation />}
        />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/followers" element={<FollowersPage />} />
        <Route path="/followings" element={<FollowingsPage />} />
        <Route path="/messenger" element={<MessengersPage />} />
      </Routes>
    </Router>
  );
}
export default App;
