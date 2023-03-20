import { configureStore } from "@reduxjs/toolkit";
import changeThemeReducer from "./features/changeTheme/changeThemeSlice";


export const store = configureStore({
  reducer: {
    theme: changeThemeReducer,
  },
});
