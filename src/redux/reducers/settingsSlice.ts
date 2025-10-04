import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface SettingsState {
  theme: "light" | "dark";
  language: "tr" | "en";
}

const initialState: SettingsState = {
  theme: "light",
  language: "tr",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setLanguage: (state, action: PayloadAction<"tr" | "en">) => {
      state.language = action.payload;
    },
    resetSettings: (state) => {
      state.theme = "light";
      state.language = "tr";
    },
  },
});

const persistConfig = {
  key: "settings",
  storage,
};

export const { setTheme, toggleTheme, setLanguage, resetSettings } =
  settingsSlice.actions;

export default persistReducer(persistConfig, settingsSlice.reducer);
