/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Switch from "@mui/material/Switch";

// Lib util methods
import dbOps from "../../../libs/dbops";

import { setUserInfo } from "../../../reducer/Types";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

//material-ui
import { Grid } from "@mui/material";

//Formik and yup
import * as Yup from "yup";
import { Formik, Form } from "formik";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import {
  useArgonController,
  setMiniSidenav,
  setDarkSidenav,
  setSidenavColor,
  setFixedNavbar,
  setDarkMode,
} from "context";

// Image
const bgImage =
  "https://mcr.health/wp-content/uploads/2021/03/If-You-Cant-Get-a-Doctors-Appointment.jpg";

const validations = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [controller, _dispatch] = useArgonController();

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (values, actions) => {
    debugger;
    await sleep(1000);
    actions.setSubmitting(false);
    values.email = values.email.toLowerCase();

    try {
      let dbops = new dbOps();
      let data = {
        email: inputValues.email,
        password: inputValues.password,
      };
      let res = await dbops.signIn(data);

      if (res.message === "SUCCESS") {
        let _user_Info = userInfo;
        _user_Info.user_id = res.data.id;
        _user_Info.first_name = res.data.name_first;
        _user_Info.last_name = res.data.name_last;
        _user_Info.email = res.data.email;
        _user_Info.role = res.data.role;
        _user_Info.address = res.data.address;
        _user_Info.isUserLoggedIn = true;
        dispatch(setUserInfo(_user_Info));

        navigate("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <IllustrationLayout
      title="Sign In"
      description=""
      illustration={{
        image: bgImage,
        title: "SB Bookings",
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        <Formik
          initialValues={inputValues}
          validationSchema={validations}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors, handleSubmit }) => {
            return (
              <Form id="link-creation-form" autoComplete="off" onSubmit={handleSubmit}>
                <ArgonBox pb={3} px={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <ArgonInput
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={values.email}
                        error={errors.email && touched.email}
                        success={values.email.length > 0 && !errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ArgonInput
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password && touched.password}
                        success={values.password.length > 0 && !errors.password}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleSubmit();
                        }}
                      />
                    </Grid>
                  </Grid>
                  <ArgonBox mt={4} mb={1}>
                    <ArgonButton color="info" size="large" fullWidth onClick={handleSubmit}>
                      Sign In
                    </ArgonButton>
                  </ArgonBox>
                  <ArgonBox mt={3} textAlign="center">
                    <ArgonTypography variant="button" color="text" fontWeight="regular">
                      Don&apos;t have an account?{" "}
                      <ArgonTypography
                        component={Link}
                        to="/authentication/sign-up"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                      >
                        Sign up
                      </ArgonTypography>
                    </ArgonTypography>
                  </ArgonBox>
                </ArgonBox>
              </Form>
            );
          }}
        </Formik>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default SignIn;
