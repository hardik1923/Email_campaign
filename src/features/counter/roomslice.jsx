import { createSlice } from "@reduxjs/toolkit";

const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options) + " campaign";
};

const currentDate = formatDate(new Date());

export const roomslice = createSlice({
  name: "campaign",
  initialState: {
    campaignId: "1234",
    name: currentDate,
    segmentId: "",
    starttime: "",
    subject: "",
    senderemail: "",
    enableedit: false,
    enableclone: false,
  },
  reducers: {
    setid: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.campaignId = action.payload.id;
    },
    setname: (state, action) => {
      state.name = action.payload.name;
    },
    setsegmentId: (state, action) => {
      state.segmentId = action.payload.segmentId;
    },
    setenableedit: (state, action) => {
      Templatehtml;
      state.enableedit = action.payload.enableedit;
    },
    setstarttime: (state, action) => {
      state.starttime = action.payload.starttime;
    },
    setenableclone: (state, action) => {
      state.enableclone = action.payload.enableclone;
    },
    setsubject: (state, action) => {
      state.subject = action.payload.subject;
    },
    setsenderemail: (state, action) => {
      state.senderemail = action.payload.senderemail;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setid,
  setname,
  setsegmentId,
  setenableedit,
  setstarttime,
  setenableclone,
  setsubject,
  setsenderemail,
} = roomslice.actions;
export default roomslice.reducer;
