import { SET_USER_INFO } from "./ActionTypes";
export const setUserInfo = (info) => {
  return {
    type: SET_USER_INFO,
    payload: info,
  };
};
