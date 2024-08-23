import * as types from "./ActionTypes";

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
export default rootReducer;
