import { createSlice } from "@reduxjs/toolkit";
import { INews } from "../../utils/interface";

export interface INewsState {
  newsElement: INews | null;
}

const initialState: INewsState = {
  newsElement: null,
};

const productsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getNewsData(state, action) {
      state.newsElement = action.payload;
    },
  },
});

export const { getNewsData } = productsSlice.actions;

export default productsSlice.reducer;
