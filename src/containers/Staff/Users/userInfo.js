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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// NewUser page components
import FormField from "../../../common/FormField/index";
import { useFormikContext } from "formik";

//data
import selectData from "data/UserData";

function UserInfo({ formData }) {
  const { setFieldValue } = useFormikContext();
  const { formField, values, errors, touched } = formData;
  const { firstName, lastName, email, mobile, address1, address2, city, state, zip } = formField;
  const {
    firstName: firstNameV,
    lastName: lastNameV,
    email: emailV,
    mobile: mobileV,
    address1: address1V,
    address2: address2V,
    city: cityV,
    state: stateV,
    zip: zipV,
  } = values;

  const handleChange = (event, name) => {
    const { value, label } = event;
    const obj = { value, label };
    setFieldValue(name, obj); // Update Formik values
  };
  return (
    <ArgonBox>
      <ArgonBox lineHeight={0}>
        <ArgonTypography variant="h5" fontWeight="bold">
          User Personal Info
        </ArgonTypography>
        <ArgonTypography variant="button" fontWeight="regular" color="text">
          Mandatory informations
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={firstName.type}
              label={firstName.label}
              name={firstName.name}
              value={firstNameV}
              placeholder={firstName.placeholder}
              error={errors.firstName && touched.firstName}
              success={firstNameV.length > 0 && !errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={lastName.type}
              label={lastName.label}
              name={lastName.name}
              value={lastNameV}
              placeholder={lastName.placeholder}
              error={errors.lastName && touched.lastName}
              success={lastNameV.length > 0 && !errors.lastName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={mobile.type}
              label={mobile.label}
              name={mobile.name}
              value={mobileV}
              placeholder={mobile.placeholder}
              error={errors.mobile && touched.mobile}
              success={mobileV.length > 0 && !errors.mobile}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={address1.type}
              label={address1.label}
              name={address1.name}
              value={address1V}
              placeholder={address1.placeholder}
              error={errors.address1 && touched.address1}
              success={address1V.length > 0 && !errors.address1}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={address2.type}
              label={address2.label}
              name={address2.name}
              value={address2V}
              placeholder={address2.placeholder}
              error={errors.address2 && touched.address2}
              success={address2V.length > 0 && !errors.address2}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormField
              type={city.type}
              label={city.label}
              name={city.name}
              value={cityV}
              placeholder={city.placeholder}
              error={errors.city && touched.city}
              success={cityV.length > 0 && !errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              componentType="select"
              type={state.type}
              label={state.label}
              name={state.name}
              value={stateV}
              placeholder={state.placeholder}
              options={selectData.usStates}
              onChange={(e) => handleChange(e, state.name)}
              error={errors.state && touched.state}
              success={stateV.length > 0 && !errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              componentType="input"
              type={zip.type}
              label={zip.label}
              name={zip.name}
              value={zipV}
              placeholder={zip.placeholder}
              error={errors.zip && touched.zip}
              success={zipV.length > 0 && !errors.zip}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}

// typechecking props for UserInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
