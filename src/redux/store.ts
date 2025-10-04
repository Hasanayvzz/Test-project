import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import authSlice from "./reducers/authSlice";
import loaderReducer from "./reducers/loaderReducer";
import settingsSlice from "./reducers/settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    loader: loaderReducer,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
