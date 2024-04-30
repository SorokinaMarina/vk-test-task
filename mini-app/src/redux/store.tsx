import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../redux/slice/newsSlice";

const store = configureStore({
  reducer: {
    newsReducer,
  },
});

export default store;
