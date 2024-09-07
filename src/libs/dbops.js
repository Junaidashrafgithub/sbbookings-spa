import axios from "axios";
import { store } from "../reducer/Store";
import * as types from "../reducer/Types";

const errorMsgAdmin = "Please report to your admin if this continues.",
  contentType = "application/json",
  state = store.getState();

export default class dbOps {  
  async postRequest(url, data = {}) {
    debugger;
    try {
      let URL = state.URL + url;
      let token = state.userInfo.token;
      const res = await axios.post(URL, data, {
        headers: {
          "content-type": contentType,
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        if (res.data.message === "SUCCESS") {
          if (res.data.token) {
            let _userInfo = state.userInfo;
            _userInfo.token = res.data.token;
            store.dispatch(types.setUserInfo(_userInfo));
          }
        } else if (res.data.message === "FAILED") {
          alert(res.data.error.message);
          const redirectUrl = `authentication/sign-in`;
          window.location.href = redirectUrl;
        }
        return res.data;
      }
    } catch (err) {
      try {
        alert(err);
      } catch (err) {
        alert("***Reason:***" + err);
      }
    }
  }

  async signUp(data) {
    return await this.postRequest("auth/signup", data, "could not signup", errorMsgAdmin);
  }
  async signIn(data) {
    return await this.postRequest("auth/signin", data, "could not signin", errorMsgAdmin);
  }
  async changePassword(data) { 
    return await this.postRequest( "auth/change-password",  data, "could not change password", errorMsgAdmin
    );
  }
  async updateProfile(data) {
    return await this.postRequest("auth/update-profile", data, "could not update", errorMsgAdmin);
  }
  async getUserInfo(data) {
    return await this.postRequest("auth/get-user-info", data, "could not get user info", errorMsgAdmin);
  }
  async getAllStaff(data) {
    return await this.postRequest("auth/get-all-staff", data, "could not get all staff", errorMsgAdmin);
  }
  async createNewStaff(data) {
    return await this.postRequest("auth/add-staff", data, "could not add new staff", errorMsgAdmin);
  }
}
