import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "User",
  initialState: {
    email: "aktyagi18052002@gmail.com",
  },
  reducers: {
    setemail: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setemail } = counterSlice.actions;

export default counterSlice.reducer;
