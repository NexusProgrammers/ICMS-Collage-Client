import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import contactReducer from "./contactSlice";
import applyReducer from "./applySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    apply: applyReducer,
  },
});

export default store;
