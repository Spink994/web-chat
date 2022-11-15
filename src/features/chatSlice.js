import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chatName: [],
    messages: [],
  },

  reducers: {
    chatId: (state, action) => {
      state.chatName = action.payload;
    },
    messageHandler: (state, action) => {
      state.messages = [...action.payload];
    },
  },
});

// Extract and export each action creator by name
export const { chatId, messageHandler } = chatSlice.actions;

// Export the reducer, either as a default or named export
export default chatSlice.reducer;
