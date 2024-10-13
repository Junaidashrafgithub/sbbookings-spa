import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useState, useEffect } from "react";
import UserInfo from "containers/Staff/Users/userInfo";
import form from "schemas/NewUser/form";
import validations from "schemas/NewUser/validations";
import Address from "containers/Staff/Users/address";
import ArgonButton from "components/ArgonButton";
import LoadingSpinner from "common/spinner";

//utills
import { showDeleteAlert, showSuccessMessage, showCanceledMessage } from "util/alertUtil";

// @mui material components
import { Grid, Card, Icon, Stepper, Step, StepLabel } from "@mui/material";

// formik components
import { Formik, Form } from "formik";
import dbOps from "../../../libs/dbops";

function getSteps() {
  return ["Personal Info", "Login Info"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    case 1:
      return <Address formData={formData} />;
    default:
      return null;
  }
}

export default function Staff() {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    state: {
      value: "",
      label: "",
    },
    status: true,
    zip: "",
    username: "",
    password: "",
    confirmPassword: "",
    Status: "",
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "First Name", accessor: "first_Name" },
      { Header: "Last Name", accessor: "last_Name" },
      { Header: "Email", accessor: "email" },
      {
        Header: "Action",
        accessor: "action",
        align: "center",
        Cell: (props) => (
          <ArgonBox style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon
              fontSize="medium"
              style={{ display: "inline-block" }}
              onClick={() => handleEdit(props)}
            >
              edit
            </Icon>
            <Icon
              fontSize="medium"
              style={{ display: "inline-block" }}
              onClick={() => handleDelete(props)}
            >
              delete
            </Icon>
          </ArgonBox>
        ),
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getAllStaff();
  }, []);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleFormOpen = () => {
    setActiveStep(0);
    setFormOpen(!formOpen);
    setSelectedUser(null);
  };

  const handleCancel = (resetForm) => {
    setActiveStep(0);
    setFormOpen(!formOpen);
    setSelectedUser(null);
    setInitialValues({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address1: "",
      address2: "",
      city: "",
      state: {
        value: "",
        label: "",
      },
      status: true,
      zip: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleEdit = async (rowData) => {
    let dbops = new dbOps();
    const data = {
      email: rowData.row.original.email,
    };

    const result = await dbops.getStaff(data);

    const user = rowData.row.original;
    setSelectedUser(user);
    setInitialValues({
      firstName: result.data.name_first,
      lastName: result.data.name_last,
      email: result.data.email,
      mobile: result?.data.mobile,
      address1: result.data.address1,
      address2: result.data.address2,
      city: result.data.city,
      state: {
        value: result.data.state,
        label: result.data.state,
      },
      zip: result.data.zip,
      username: result.data.email,
      password: "",
      confirmPassword: "",
    });
    setFormOpen(true);
  };

  const submitForm = async (values, actions) => {
    await sleep(1000);
    setLoading(true);
    try {
      const obj = {
        name_first: values.firstName,
        name_last: values.lastName,
        email: values.email,
        mobile: values.mobile,
        city: values.city,
        address1: values.address1,
        address2: values.address2,
        state: values.state.value,
        zip: values.zip,
        login_user_name: values.email,
        password: values.password,
      };
      if (selectedUser) {
        let dbpos = new dbOps();
        let res = await dbpos.editStaff(obj);
        debugger;
        if (res.message === "SUCCESS") showSuccessMessage("User Updated Successfully");
      } else {
        let dbpos = new dbOps();
        await dbpos.createNewStaff(obj);
        showSuccessMessage("User Created Successfully.");
      }
      actions.setSubmitting(false);
      actions.resetForm();
      setLoading(false);
      setActiveStep(0);
      setFormOpen(!formOpen);
    } catch (error) {
      console.error("Error adding new user:", error);
      actions.setSubmitting(false);
    }
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleDelete = async (rowData) => {
    const data = { email: rowData.row.original.email };
    if (data) {
      await showDeleteAlert(
        async () => {
          try {
            let dbops = new dbOps();
            const res = await dbops.deleteStaff(data);
            if (res.message === "SUCCESS") {
              showSuccessMessage("Deleted Successfully");
            }
          } catch (error) {
            console.error("Error deleting item:", error);
          }
        },
        () => {
          showCanceledMessage();
        }
      );
    }
  };

  const getAllStaff = async () => {
    setLoading(true);
    const data = {};
    let dbops = new dbOps();
    let res = await dbops.getAllStaff(data);
    if ((res.message = "SUCCESS")) {
      const mappedRows = res.data.map((staff) => ({
        first_Name: staff.name_first, // matches the accessor in the table
        last_Name: staff.name_last,
        email: staff.email,
        action: "", // this will be handled by your "Action" column's Cell
      }));
      setDataTableData((prevState) => ({
        ...prevState,
        rows: mappedRows,
      }));
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3} mb={20}>
        {/* <LoadingSpinner loading={loading} /> */}
        <Grid container justifyContent="center" sx={{ height: "100%", minWidth: "100%" }}>
          {!formOpen ? (
            <Card
              sx={{
                width: "100%",
                maxWidth: {
                  sm: "90%",
                  md: "80%",
                  lg: "70%",
                },
                overflowX: "auto",
              }}
            >
              <DataTable
                table={dataTableData}
                canSearch
                showNewtaffButton={true}
                handleFormOpen={handleFormOpen}
                label="New Staff"
              />
            </Card>
          ) : (
            <Grid item xs={12} lg={8}>
              <Card
                sx={{
                  display: "grid",
                  alignItems: "center",
                  position: "relative",
                  height: "6rem",
                  borderRadius: "lg",
                  mb: 3,
                }}
              >
                <Stepper activeStep={activeStep} sx={{ margin: 0 }} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Card>
              <Formik
                enableReinitialize
                key={JSON.stringify(initialValues)}
                initialValues={initialValues}
                validationSchema={currentValidation}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, isSubmitting, resetForm }) => (
                  <Form id={formId} autoComplete="off">
                    <Card sx={{ height: "100%" }}>
                      <ArgonBox p={2}>
                        <ArgonBox>
                          {getStepContent(activeStep, { values, touched, formField, errors })}
                          <ArgonBox
                            mt={2}
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                            marginTop="1.5rem"
                          >
                            {activeStep === 0 ? (
                              <ArgonBox />
                            ) : (
                              <ArgonButton variant="gradient" color="light" onClick={handleBack}>
                                Back
                              </ArgonButton>
                            )}
                            <>
                              <ArgonBox>
                                <ArgonButton
                                  variant="gradient"
                                  color="light"
                                  sx={{ mr: 1 }}
                                  onClick={() => handleCancel(resetForm)}
                                >
                                  Cancel
                                </ArgonButton>
                                <ArgonButton
                                  disabled={isSubmitting}
                                  type="submit"
                                  variant="gradient"
                                  color="dark"
                                  onSubmit={isLastStep && handleFormOpen}
                                >
                                  {isLastStep ? "Send" : "Next"}
                                </ArgonButton>
                              </ArgonBox>
                            </>
                          </ArgonBox>
                        </ArgonBox>
                      </ArgonBox>
                    </Card>
                  </Form>
                )}
              </Formik>
            </Grid>
          )}
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}
