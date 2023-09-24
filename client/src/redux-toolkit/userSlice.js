import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  userProfileId: "",
  skipForNowController: false,
  getCompleteProfileFrom: "",
  numberOfFriendRequest: null,
  loading: false,
  deleteRequest: "",
  test: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.currentUser = null;
    },
    loginSuccess: (state, action) => {
      console.log(state);
      console.log(action.payload);
      console.log(typeof state.test);
      state.currentUser = action.payload;
    },
    loginFail: (state) => {
      state.currentUser = null;
    },
    logOutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("persist:root");
    },
    getUserProfile: (state, action) => {
      state.userProfileId = action.payload;
    },
    setNumberOfFriendRequest: (state, action) => {
      state.numberOfFriendRequest = action.payload;
    },
    decreaseNumberOfFriendRequest: (state) => {
      state.numberOfFriendRequest -= 1;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    removeLoading: (state) => {
      state.loading = false;
    },
    setUserProfilePicture: (state, action) => {
      state.currentUser.profilepicture = action.payload;
    },
    setUserGender: (state, action) => {
      state.currentUser.gender = action.payload;
    },
    getDeleteRequest: (state, action) => {
      state.deleteRequest = action.payload;
    },
  },
});

export const {
  loginStart,
  loginFail,
  loginSuccess,
  logOutUser,
  getUserProfile,
  setSkipForNowController,
  removeSkipForNowController,
  fromSignUp,
  fromUserProfile,
  setNumberOfFriendRequest,
  decreaseNumberOfFriendRequest,
  setLoading,
  removeLoading,
  setUserProfilePicture,
  setUserGender,
  getDeleteRequest,
} = userSlice.actions;
export default userSlice.reducer;
