/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import * as Yup from "yup";
import checkout from "schemas/NewUser/form";

const {
  formField: {
    firstName,
    lastName,
    email,
    mobile,
    address1,
    city,
    state,
    zip,
    username,
    password,
    confirmPassword,
    role,
    groupType,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(firstName.errorMsg),
    [lastName.name]: Yup.string().required(lastName.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [mobile.name]: Yup.string().required(mobile.errorMsg),
    [address1.name]: Yup.string().required(address1.errorMsg),
    [city.name]: Yup.string().required(city.errorMsg),
    // [state.name]: Yup.object().required(state.errorMsg),
    [zip.name]: Yup.string().required(zip.errorMsg).min(5, zip.invalidMsg),
  }),
  Yup.object().shape({
    [password.name]: Yup.string().required(password.errorMsg), //.min(6, password.invalidMsg),
    [confirmPassword.name]: Yup.string()
      .required(confirmPassword.errorMsg)
      .oneOf([Yup.ref(password.name), null], confirmPassword.invalidMsg),
    // [role.name]: Yup.string().required(role.errorMsg),
    // [groupType.name]: Yup.string().required(groupType.errorMsg),
  }),
];

export default validations;
