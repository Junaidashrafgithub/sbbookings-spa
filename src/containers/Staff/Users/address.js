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

import { useState } from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// NewUser page components
import FormField from "../../../common/FormField/index";
import userData from "data/UserData";
import { useFormikContext } from "formik";
//import { getGroupAndStoreByType } from "api/umsApi";

function Address({ formData }) {
  const { setFieldValue } = useFormikContext();
  const [optionsData, setOptionsData] = useState([]);

  const { formField, values, errors, touched } = formData;
  const { username, password, confirmPassword, /* role, groupType, group  */} = formField;
  const {
    email: emailV,
    username: usernameV,
    password: passwordV,
    confirmPassword: confirmPasswordV,
    /* role: roleV,
    groupType: groupTypeV,
    group: groupV, */
  } = values;

  const handleChangeGroupType = (event, name) => {
    const { value, label } = event;
    const obj = { value, label };
    setFieldValue("group", { label: "", value: "" });
    setFieldValue(name, obj); // Update Formik values
    if (event.operation === "GroupType" || event.operation === "StoreType") {
      event.operation === "GroupType" ? setGroupStoreLabel("Group") : setGroupStoreLabel("Store");
      setIsGroup(true);
      GetGroupAndStoreByTypes(value, event.operation);
    } else {
      setGroupStoreLabel("");
      setIsGroup(false);
    }
  };

  const handleChange = (event, name) => {
    const { value, label } = event;
    const obj = { value, label };
    setFieldValue(name, obj); // Update Formik values
  };

  const GetGroupAndStoreByTypes = async (IDType, operation) => {
    var GroupAndType = {
      idType: IDType.toString(),
      operation,
    };
    let result = await getGroupAndStoreByType(GroupAndType);
    if (result) {
      if (groupStoreLabel === "Group") {
        result = result.filter((item) => item.groupStore_uid === IDType);
      } else if (groupStoreLabel === "Group") {
        result = result.filter((item) => item.group_ID === IDType);
      }

      result = result.map((item) => {
        return { value: item.groupStore_uid, label: item.groupStore_desc };
      });

      setOptionsData(result);
    }
  };

  return (
    <ArgonBox>
      <ArgonTypography variant="h5" fontWeight="bold">
        User Login Info
      </ArgonTypography>
      <ArgonBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormField
              type={username.type}
              label={username.label}
              name={username.name}
              value={emailV}
              placeholder={username.placeholder}
              error={errors.username && touched.username}
              success={usernameV.length > 0 && !errors.username}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              type={password.type}
              label={password.label}
              name={password.name}
              value={passwordV}
              placeholder={password.placeholder}
              error={errors.password && touched.password}
              success={passwordV.length > 0 && !errors.password}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              type={confirmPassword.type}
              label={confirmPassword.label}
              name={confirmPassword.name}
              value={confirmPasswordV}
              placeholder={confirmPassword.placeholder}
              error={errors.confirmPassword && touched.confirmPassword}
              success={confirmPasswordV.length > 0 && !errors.confirmPassword}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={4}>
            <FormField
              componentType="select"
              type={role?.type}
              label={role.label}
              name={role.name}
              value={roleV}
              placeholder={role.placeholder}
              options={userData.userRole}
              onChange={(e) => handleChange(e, role.name)} // Pass onChange handler
              error={errors.role && touched.role}
              success={roleV.length > 0 && !errors.role}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={4}>
            <FormField
              componentType="select"
              type={groupType.type}
              label={groupType.label}
              name={groupType.name}
              value={groupTypeV}
              placeholder={groupType.placeholder}
              onChange={(e) => handleChangeGroupType(e, groupType.name)}
              options={userData.groupType}
              error={errors.groupType && touched.groupType}
              success={groupTypeV.length > 0 && !errors.groupType}
            />
          </Grid> */}
         {/*  <Grid item xs={12} sm={4}>
            {isGroup && (
              <FormField
                componentType="select"
                type={group.type}
                label={groupStoreLabel}
                name={group.name}
                value={groupV}
                placeholder={group.placeholder}
                onChange={(e) => handleChange(e, group.name)}
                options={optionsData}
                // options={userData.groupType.map((option) => {
                //   return (
                //     <option key={option.id} value={option.id}>
                //       {option.label}
                //     </option>
                //   );
                // })}
                error={errors.group && touched.group}
                success={groupV.length > 0 && !errors.group}
              />
            )}
          </Grid> */}
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}

// typechecking props for Address
Address.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Address;
