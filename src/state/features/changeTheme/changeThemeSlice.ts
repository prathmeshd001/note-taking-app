import { createSlice } from "@reduxjs/toolkit";

type ThemeState= {
  theme: string
}

export type Reducer={
  theme: ThemeState
}

const initialState: ThemeState = {
  theme: "dark",
};

export const changeThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = changeThemeSlice.actions;

export default changeThemeSlice.reducer;
