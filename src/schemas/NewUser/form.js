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

const form = {
  formId: "new-user-form",
  formField: {
    firstName: {
      name: "firstName",
      label: "first name",
      type: "text",
      placeholder: "eg. Micheal",
      errorMsg: "First name is required.",
    },
    lastName: {
      name: "lastName",
      label: "last name",
      type: "text",
      placeholder: "eg. Prior",
      errorMsg: "Last name is required.",
    },
    email: {
      name: "email",
      label: "email address",
      type: "email",
      placeholder: "eg. soft@dashboard.come",
      errorMsg: "Email address is required.",
      invalidMsg: "Your email address is invalid",
    },
    mobile: {
      name: "mobile",
      label: "mobile",
      type: "number",
      placeholder: "eg. 0123456789",
      errorMsg: "Mobile is required.",
    },
    address1: {
      name: "address1",
      label: "address 1",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "Address is required.",
    },
    address2: {
      name: "address2",
      label: "address 2",
      type: "text",
      placeholder: "eg. Street 221",
    },
    city: {
      name: "city",
      label: "city",
      type: "text",
      placeholder: "eg. Juneau",
      errorMsg: "City is required.",
    },
    state: {
      name: "state",
      label: "state",
      type: "text",
      placeholder: "eg. Alaska",
      errorMsg: "State is required.",
    },
    zip: {
      name: "zip",
      label: "zip",
      type: "number",
      placeholder: "7 letters",
      errorMsg: "Zip is required.",
      invalidMsg: "Zipcode is not valie (e.g. 70000).",
    },
    username: {
      name: "username",
      label: "user name",
      type: "text",
      placeholder: "eg. Micheal",
      errorMsg: "Username is required.",
    },

    password: {
      name: "password",
      label: "password",
      type: "password",
      placeholder: "******",
      errorMsg: "Password is required.",
      invalidMsg: "Your password should be more than 6 characters.",
    },
    confirmPassword: {
      name: "confirmPassword",
      label: "confirm password",
      type: "password",
      placeholder: "******",
      errorMsg: "Password is required.",
      invalidMsg: "Your password doesn't match.",
    },
    role: {
      name: "role",
      label: "role",
      placeholder: "eg. Admin",
      errorMsg: "Role is required.",
    },
    groupType: {
      name: "groupType",
      label: "group type",
      placeholder: "eg. GOT",
      errorMsg: "Group Type is required.",
    },
    group: {
      name: "group",
      label: "Group",
      placeholder: "eg. GOT",
      errorMsg: "Group is required.",
    },
    // isActive: {
    //   name: "username",
    //   label: "user name",
    //   type: "text",
    //   placeholder: "eg. Micheal",
    //   errorMsg: "Username is required.",
    // },
  },
};

export default form;
