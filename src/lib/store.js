const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "./features/authSlice";
import darkModeReducer from "./features/darkModeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
