//the state contains the token, loading, and signupData
//slice name is auth
//reducers are setToken, setLoading, and setSignupData

import { createSlice } from "@reduxjs/toolkit";

console.log("token from local storage", localStorage.getItem("token"));
const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  // token: null,
  loading: false,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setToken, setLoading, setSignupData } = authSlice.actions;
