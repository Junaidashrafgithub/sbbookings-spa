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
  return ["Service Info"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <ServiceInfo formData={formData} />;
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
      { Header: "#", accessor: "id" },
      { Header: "Name", accessor: "name" },
      {
        Header: "Action",
        accessor: "action",
        align: "center",
        Cell: (props) => (
          <ArgonBox style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
    debugger;
    setActiveStep(0);
    setFormOpen(!formOpen);
    setInitialValues({
      name: "",
    });
  };

  const handleSubmit = async (values, actions) => {
    await sleep(1000);
    setLoading(true);
    try {
      const obj = {
        name: values.name,
      };
      let dbpos = new dbOps();
      const res = await dbpos.addNewService(obj);
      if (res.message === "SUCCESS") {
        showSuccessMessage("New Service Created Successfully!");
      }
      actions.setSubmitting(false);
      actions.resetForm();
      setLoading(false);
      setActiveStep(0);
      setFormOpen(!formOpen);
      getAllServices();
    } catch (error) {
      console.error("Error adding new service:", error);
      actions.setSubmitting(false);
    }
  };

  const handleDelete = async (rowData) => {
    // debugger;
    const data = { id: rowData.row.original.id };
    if (data) {
      await showDeleteAlert(
        async () => {
          try {
            let dbops = new dbOps();
            const res = await dbops.deleteService(data);
            if (res.message === "SUCCESS") {
              showSuccessMessage("Deleted Successfully!");
              getAllServices();
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

    try {
      let res = await dbops.getAllServices(data);

      if (res?.message === "SUCCESS") {
        const mappedRows = (res.data || []).map((service) => ({
          id: service.id,
          name: service.name,
        }));

        setDataTableData((prevState) => ({
          ...prevState,
          rows: mappedRows,
        }));
      } else {
        console.warn("No data found.");
        setDataTableData((prevState) => ({
          ...prevState,
          rows: [],
        }));
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
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
                                  variant="gradient"
                                  color="light"
                                  onClick={handleCancel}
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
