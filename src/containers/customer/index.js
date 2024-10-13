import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState, useEffect } from "react";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import validations from "schemas/NewUser/validations";

// @mui material components
import { Grid, Card, Icon, Stepper, Step, StepLabel } from "@mui/material";
import DataTable from "examples/Tables/DataTable";

import Address from "containers/customer/components/userInfo";
import UserInfo from "containers/customer/components/userInfo";
import form from "schemas/NewUser/form";

// formik components
import { Formik, Form } from "formik";

//timeline
import Modal from "@mui/material/Modal";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

//dbOps
import dbOps from "libs/dbops";

//utills
import { showDeleteAlert, showSuccessMessage, showCanceledMessage } from "util/alertUtil";

function getSteps() {
  return ["Personal Info", "Save"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    //case 1:
    //return <Address formData={formData} />;
    default:
      return null;
  }
}

export default function Customer() {
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

  //modal
  const [openModal, setOpenModal] = useState(false);

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "First Name", accessor: "first_Name" },
      { Header: "Last Name", accessor: "last_Name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Department", accessor: "department" },
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
              onClick={() => handlePatientHistory(props)}
            >
              info
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

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    getAllPateints();
  }, []);

  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const handlePatientHistory = async (rowData) => {
    //debugger
    const data = {
      email: rowData.row.original.email,
    };
    let dbops = new dbOps();
    let res = await dbops.getPatientHistory(data);
    console.log(res.data);
  };

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
    debugger;
    let dbops = new dbOps();
    const data = {
      email: rowData.row.original.email,
    };

    const result = await dbops.getPatient(data);

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
      department: result.data.department,
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
        department: values.department.label,
      };
      if (selectedUser) {
        let dbpos = new dbOps();
        await dbpos.editPatient(obj);
        showSuccessMessage("User Updated Successfully!");
      } else {
        let dbpos = new dbOps();
        await dbpos.addNewPatient(obj);
        showSuccessMessage("New User Created Successfully");
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
    // if (isLastStep) {
    submitForm(values, actions);
    //} else {
    // setActiveStep(activeStep + 1);
    //actions.setTouched({});
    //actions.setSubmitting(false);
    // }
  };

  const handleDelete = async (rowData) => {
    const data = { email: rowData.row.original.email };
    if (data) {
      await showDeleteAlert(
        async () => {
          debugger;
          try {
            let dbops = new dbOps();
            const res = await dbops.deletePatient(data);
            if (res.message === "SUCCESS") {
              showSuccessMessage("Deleted Successfully!");
            }
          } catch (error) {
            console.error("Error deleting patient:", error);
          }
        },
        () => {
          showCanceledMessage();
        }
      );
    }
  };

  const getAllPateints = async () => {
    setLoading(true);
    const data = {};
    let dbops = new dbOps();
    let res = await dbops.getAllPatients(data);
    debugger;
    if ((res.message = "SUCCESS")) {
      const mappedRows = res.data.map((patient) => ({
        first_Name: patient.name_first,
        last_Name: patient.name_last,
        email: patient.email,
        phone: patient.mobile,
        department: patient.department,
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
                label="New Patient"
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
                <Stepper activeStep={0} sx={{ margin: 0 }} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label} sx={{ display: activeStep === 0 ? "" : "none" }}>
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
                            justifyContent="flex-end"
                            marginTop="1.5rem"
                          >
                            <>
                              <ArgonBox style={{ display: "flex", alignItems: "flex-end", gap: 5 }}>
                                <ArgonButton
                                  disabled={isSubmitting}
                                  type="submit"
                                  variant="gradient"
                                  color="light"
                                  onSubmit={handleCancel}
                                >
                                  Cancel
                                </ArgonButton>
                                <ArgonButton
                                  disabled={isSubmitting}
                                  type="submit"
                                  variant="gradient"
                                  color="dark"
                                  onSubmit={handleSubmit}
                                >
                                  Add
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
        {openModal && (
          <Modal
            open={open}
            onClose={handleModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <ArgonBox
              sx={{ width: 400, p: 4, bgcolor: "background.paper", margin: "auto", mt: "10%" }}
            >
              {/* <ArgonTypography id="modal-title">{selectedPatient}'s Appointments</ArgonTypography> */}
              <Timeline>
                {/* {appointments
                            .filter(app => app.patientName === selectedPatient)
                            .map((app, index) => (
                                <TimelineItem key={index}>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <div>
                                            <strong>{app.status}</strong>
                                            <div>{new Date(app.startDateTime).toLocaleString()} - {new Date(app.endDateTime).toLocaleString()}</div>
                                        </div>
                                    </TimelineContent>
                                </TimelineItem>
                            ))} */}
              </Timeline>
            </ArgonBox>
          </Modal>
        )}
      </ArgonBox>
    </DashboardLayout>
  );
}
