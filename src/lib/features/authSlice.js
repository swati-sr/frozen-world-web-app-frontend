const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";

// Helper function to update user state
const updateUserState = (state, payload) => {
  const { firstName, lastName, phoneNumber, email, image, token } = payload;
  if (firstName !== undefined) state.firstName = firstName;
  if (lastName !== undefined) state.lastName = lastName;
  if (phoneNumber !== undefined) state.phoneNumber = phoneNumber;
  if (email !== undefined) state.email = email;
  if (image !== undefined) state.image = image;
  if (token !== undefined) {
    state.token = token;
    Cookies.set("access_token", token, { expires: 1, path: "/" });
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    image: null,
    token: Cookies.get("access_token") || null,
  },
  reducers: {
    register: (state, action) => {
      updateUserState(state, action.payload);
    },
    login: (state, action) => {
      updateUserState(state, action.payload);
    },
    logout: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.phoneNumber = null;
      state.email = null;
      state.token = null;
      state.image = null;
      Cookies.remove("access_token", { path: "/" });
    },
    updateUser: (state, action) => {
      updateUserState(state, action.payload);
    },
  },
});

export const { register, login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
