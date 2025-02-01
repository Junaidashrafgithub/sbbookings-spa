import axios from "axios";
import { store } from "../reducer/Store";
import * as types from "../reducer/Types";

const errorMsgAdmin = "Please report to your admin if this continues.",
  contentType = "application/json",
  state = store.getState();

export default class dbOps {
  async postRequest(url, data = {}) {
    // debugger;
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
            let _userInfo = {
              address: res.data.data.address ? res.data.data.address : state.address,
              email: res.data.data.email ? res.data.data.email : state.email,
              first_name: res.data.data.name_first ? res.data.data.name_first : state.first_name,
              last_name: res.data.data.name_last ? res.data.data.name_last : state.last_name,
              isUserLoggedIn: true,
              img: res.data.data.img ? res.data.data.img : state.img,
              role: res.data.data.role ? res.data.data.role : state.role,
              token: res.data.token ? res.data.token : state.token,
              user_id: res.data.data.id ? res.data.data.id : state.user_id,
            };
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
    return await this.postRequest(
      "auth/change-password",
      data,
      "could not change password",
      errorMsgAdmin
    );
  }
  async updateProfile(data) {
    return await this.postRequest("auth/update-profile", data, "could not update", errorMsgAdmin);
  }
  async getUserInfo(data) {
    return await this.postRequest(
      "auth/get-user-info",
      data,
      "could not get user info",
      errorMsgAdmin
    );
  }

  //staff
  async getAllStaff(data) {
    return await this.postRequest(
      "staff/get-all-staff",
      data,
      "could not get all staff",
      errorMsgAdmin
    );
  }
  async createNewStaff(data) {
    return await this.postRequest(
      "staff/add-staff",
      data,
      "could not add new staff",
      errorMsgAdmin
    );
  }
  async getStaff(data) {
    return await this.postRequest("staff/get-staff", data, "could not get staff", errorMsgAdmin);
  }
  async editStaff(data) {
    return await this.postRequest("staff/edit-staff", data, "could not edit staff", errorMsgAdmin);
  }
  async deleteStaff(data) {
    return await this.postRequest(
      "staff/delete-staff",
      data,
      "could not delete staff",
      errorMsgAdmin
    );
  }

  //patients
  async getAllPatients(data) {
    return await this.postRequest(
      "patient/get-all-patient",
      data,
      "could not get all patinet",
      errorMsgAdmin
    );
  }

  async getPatient(data) {
    return await this.postRequest(
      "patient/get-patient",
      data,
      "could not get patient",
      errorMsgAdmin
    );
  }

  async addNewPatient(data) {
    return await this.postRequest(
      "patient/add-patient",
      data,
      "could not add new staff",
      errorMsgAdmin
    );
  }

  async editPatient(data) {
    return await this.postRequest(
      "patient/edit-patient",
      data,
      "could not edit staff",
      errorMsgAdmin
    );
  }

  async deletePatient(data) {
    return await this.postRequest(
      "patient/delete-patient",
      data,
      "could not delete staff",
      errorMsgAdmin
    );
  }

  async getPatientHistory(data) {
    return await this.postRequest(
      "patient/get-patient-history",
      data,
      "could not get patient",
      errorMsgAdmin
    );
  }
  //appointment
  async addNewAppointment(data) {
    return await this.postRequest(
      "appointment/add-new-appointment",
      data,
      "could not add appointment",
      errorMsgAdmin
    );
  }
  async getAllAppointments(data) {
    return await this.postRequest(
      "appointment/get-all-appointment",
      data,
      "could not get appointment",
      errorMsgAdmin
    );
  }

  async getAllServices(data) {
    return await this.postRequest("service/get-all-services", data);
  }

  async addNewService(data) {
    return await this.postRequest("service/add-service", data);
  }

  async deleteService(data) {
    return await this.postRequest("service/delete-service", data);
  }
}
