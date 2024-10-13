// reducers/index.js
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import * as types from "./ActionTypes"; // Assuming ActionTypes is in the same directory

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo"], // Only persist userInfo
};

const initialState = {
  userInfo: {
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    address: "",
    img: "",
    isUserLoggedIn: false,
    token: null,
  },
  notification: null,
  URL: "http://localhost:4010/",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    // Other cases...
    default:
      return state;
  }
};

// Create the persisted reducer
export const persistedReducer = persistReducer(persistConfig, rootReducer);

/* import * as types from "./ActionTypes";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo"], // Only persist userInfo
};

const initialState = {
  userInfo: {
    user_id: 0,
    name: "",
    email: "",
    role: "",
    img: "",
    isUserLoggedIn: false,
    token: null,
  },
  notification: null,
  URL: "http://localhost:4010/",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return { ...state, userInfo: action.payload };

    default:
      return state;
  }
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
 */
