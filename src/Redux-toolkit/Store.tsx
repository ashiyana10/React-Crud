import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./EmployeeReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  employeeSlice,
});
const persistReducers = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    persistReducers,
  },
});

export default store;
