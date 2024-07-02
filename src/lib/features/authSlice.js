const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";

const updateUserState = (state, payload) => {
  const {
    grade,
    firstName,
    lastName,
    phoneNumber,
    email,
    image,
    token,
    address,
    city,
    stateLocation,
    pincode,
  } = payload;
  if (grade !== undefined) state.grade = grade;
  if (firstName !== undefined) state.firstName = firstName;
  if (lastName !== undefined) state.lastName = lastName;
  if (phoneNumber !== undefined) state.phoneNumber = phoneNumber;
  if (email !== undefined) state.email = email;
  if (image !== undefined) state.image = image;
  if (address !== undefined) state.address = address;
  if (city !== undefined) state.city = city;
  if (stateLocation !== undefined) state.stateLocation = stateLocation;
  if (pincode !== undefined) state.pincode = pincode;
  if (token !== undefined) {
    state.token = token;
    Cookies.set("access_token", token, { expires: 1, path: "/" });
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    grade: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    image: null,
    address: null,
    city: null,
    stateLocation: null,
    pincode: null,
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
      state.admin = null;
      state.firstName = null;
      state.lastName = null;
      state.phoneNumber = null;
      state.email = null;
      state.token = null;
      state.image = null;
      state.address = null;
      state.city = null;
      state.stateLocation = null;
      state.pincode = null;
      Cookies.remove("access_token", { path: "/" });
    },
    updateUser: (state, action) => {
      updateUserState(state, action.payload);
    },
  },
});

export const { register, login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
