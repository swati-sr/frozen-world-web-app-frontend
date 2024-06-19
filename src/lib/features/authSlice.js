const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";

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
      const { firstName, lastName, phoneNumber, email } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
      state.email = email;
    },
    login: (state, action) => {
      const { token, firstName, lastName, phoneNumber, email, image } =
        action.payload;
      state.token = token;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
      state.email = email;
      state.image = image;
      Cookies.set("access_token", token, { expires: 1, path: "/" });
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
    // updateUser: (state, action) => {
    //   const { fullName, image } = action.payload;
    //   state.fullName = fullName;
    //   state.image = image;
    // },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
