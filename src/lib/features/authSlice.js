const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    fullName: null,
    phoneNumber: null,
    email: null,
    token: Cookies.get("access_token") || null,
  },
  reducers: {
    register: (state, action) => {
      const { fullName, phoneNumber, email } = action.payload;
      state.fullName = fullName;
      state.phoneNumber = phoneNumber;
      state.email = email;
    },
    login: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      Cookies.set("access_token", token, { expires: 7, path: "/" });
    },
    logout: (state) => {
      state.fullName = null;
      state.phoneNumber = null;
      state.email = null;
      state.token = null;
      Cookies.remove("access_token", { path: "/" });
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
