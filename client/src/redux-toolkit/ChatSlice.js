import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: "",
  oneConversationReload: "",
  unViwedMessage: 0,
  unViwedMessageReload: null,
  conversations: [],
  decreaseAmount: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setOneConversationReload: (state, action) => {
      state.oneConversationReload = action.payload;
    },
    getUnViewedMessages: (state, action) => {
      console.log(action.payload);
      state.conversations.push(action.payload);
      state.unViwedMessage += parseInt(action.payload.lenOfConversation);
    },
    decreaseUnViewedMessages: (state, action) => {
      // const { conversationId } = action.payload;
      console.log(state.conversations);
      state.conversations.forEach((item) => {
        console.log(item);
        // if (item.conversationId === conversationId) {
        //   state.unViwedMessage -= parseInt(item.lenOfConversation);
        // }
      });
    },
    removeUnViewedMessages: (state) => {
      state.unViwedMessage = 0;
      state.conversations = [];
    },
  },
});

export const {
  getChat,
  setOneConversationReload,
  getUnViewedMessages,
  removeUnViewedMessages,
  decreaseUnViewedMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
