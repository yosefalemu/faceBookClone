import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCommentModalOpen: false,
  idForComment: "",
};

const commentModalSlice = createSlice({
  name: "commentModal",
  initialState,
  reducers: {
    openCommentModal: (state, action) => {
      state.isCommentModalOpen = true;
      state.idForComment = action.payload;
    },
    closeCommentModal: (state, action) => {
      state.isCommentModalOpen = false;
    },
  },
});

export const { openCommentModal, closeCommentModal } =
  commentModalSlice.actions;

export default commentModalSlice.reducer;
