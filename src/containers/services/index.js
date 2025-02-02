import { useState, useEffect } from "react";
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import validations from "schemas/NewService/validations";
// Argon Dashboard 2 MUI Examples
import ArgonButton from "components/ArgonButton";

import DataTable from "examples/Tables/DataTable";
import { Icon, Grid, Card, Stepper, Step, StepLabel } from "@mui/material";

// formik components
import { Formik, Form } from "formik";

import ServiceInfo from "containers/services/components/serviceInfo";
import form from "schemas/NewService/form";
import dbOps from "libs/dbops";
import { showDeleteAlert, showSuccessMessage, showCanceledMessage } from "util/alertUtil";

function getSteps() {
  return ["Service Info", "Save"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <ServiceInfo formData={formData} />;
    //case 1:
    //return <Address formData={formData} />;
    default:
      return null;
  }
}

export default function Services() {
  const [initialValues, setInitialValues] = useState({
    name: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "#", accessor: "id" }, // Name of the service
      { Header: "Name", accessor: "name" }, // Name of the service
      {
        Header: "Action",
        accessor: "action",
        align: "center",
        Cell: (props) => (
          <ArgonBox style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* <Icon
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
            </Icon> */}
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
    getAllServices();
  }, []);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleFormOpen = () => {
    setActiveStep(0);
    setFormOpen(!formOpen);
  };

  const handleCancel = (resetForm) => {
    setActiveStep(0);
    setFormOpen(!formOpen);
    setInitialValues({
      name: "",
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleEdit = async (rowData) => {
    debugger;
    let dbops = new dbOps();
    const data = {
      id: rowData.row.original.id,
    };

    const result = await dbops.getService(data);

    // const user = rowData.row.original;
    // setSelectedUser(user);
    setInitialValues({
      name: result.data.name,
    });
    setFormOpen(true);
  };

  // const submitForm = async (values, actions) => {
  //     await sleep(1000);
  //     setLoading(true);
  //     try {
  //       const obj = {
  //         name: values.name
  //       };
  //       if (selectedUser) {
  //         let dbpos = new dbOps();
  //         await dbpos.editPatient(obj);
  //         showSuccessMessage("User Updated Successfully!");
  //       } else {
  //         let dbpos = new dbOps();
  //         await dbpos.addNewPatient(obj);
  //         showSuccessMessage("New User Created Successfully");
  //       }
  //       actions.setSubmitting(false);
  //       actions.resetForm();
  //       setLoading(false);
  //       setActiveStep(0);
  //       setFormOpen(!formOpen);
  //     } catch (error) {
  //       console.error("Error adding new user:", error);
  //       actions.setSubmitting(false);
  //     }
  //   };

  // const handleSubmit = async (values, actions) => {
  //   if (isLastStep) {
  //     try {
  //       let dbops = new dbOps();
  //       const result = await dbops.addService(values); // Assuming addService is a function that adds a new service to the database
  //       actions.resetForm();
  //       // Optionally, you can show a success message or redirect the user
  //       alert('Service added successfully!');
  //     } catch (error) {
  //       console.error('Error adding service:', error);
  //       // Optionally, you can show an error message to the user
  //       alert('Failed to add service. Please try again.');
  //     } finally {
  //       actions.setSubmitting(false);
  //     }
  //   } else {
  //     setActiveStep(activeStep + 1);
  //     actions.setTouched({});
  //     actions.setSubmitting(false);
  //   }
  // };

  const handleDelete = async (rowData) => {
    debugger;
    const data = { email: rowData.row.original.id };
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

  const getAllServices = async () => {
    setLoading(true);
    const data = {};
    let dbops = new dbOps();
    let res = await dbops.getAllServices(data);
    // console.log(res);
    // debugger;
    if (res.message === "SUCCESS") {
      const mappedRows = res.data.map((service) => ({
        id: service.id,
        name: service.name,
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
                label="New Service"
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
      </ArgonBox>
    </DashboardLayout>
  );
}
