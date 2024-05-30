import { configureStore, combineReducers } from "@reduxjs/toolkit";
import schedule from "./schedule/scheduleSlice";
import history from "./history/historySlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["schedule", "history"],
};
const rootReducer = combineReducers({
  schedule,
  history,
});
const persistorReducer = persistReducer(rootPersistConfig, rootReducer);
export const store = configureStore({
  reducer: persistorReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
