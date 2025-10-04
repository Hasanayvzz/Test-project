import { UserData } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface AuthState {
  isAuthenticated: boolean;
  userData: UserData;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: {
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    expiresIn: null,
    refreshExpiresAt: null,
    refreshExpiresIn: null,
    tokenType: null,
    email: null,
    fullName: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<UserData>>) => {
      state.isAuthenticated = true;
      state.userData = {
        accessToken: action.payload.accessToken ?? null,
        refreshToken: action.payload.refreshToken ?? null,
        expiresAt: action.payload.expiresAt ?? null,
        expiresIn: action.payload.expiresIn ?? null,
        refreshExpiresAt: action.payload.refreshExpiresAt ?? null,
        refreshExpiresIn: action.payload.refreshExpiresIn ?? null,
        tokenType: action.payload.tokenType ?? null,
        email: action.payload.email ?? null,
        fullName: action.payload.fullName ?? null,
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = {
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
        expiresIn: null,
        refreshExpiresAt: null,
        refreshExpiresIn: null,
        tokenType: null,
        email: null,
        fullName: null,
      };
    },
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      state.isAuthenticated = true;
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
};

export const { login, logout, updateUser } = authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer);

export type { AuthState, UserData };
