/* eslint-disable no-unused-vars */
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

// @mui material components
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { MenuItem } from "@mui/material";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Argon Dashboard 2 MUI base styles
import ArgonTypography from "components/ArgonTypography";
import Chip from "@mui/material/Chip";
import { FormControlLabel, Switch } from "@mui/material";
import { Card, Modal, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import ArgonSelect from "components/ArgonSelect";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dbOps from "libs/dbops";

//mui date time picker
import "rsuite/dist/rsuite.min.css";
import { DatePicker } from "rsuite";
import { FaCalendar } from "react-icons/fa";

//data
import selectData from "data/UserData";
import { showSuccessMessage } from "util/alertUtil";
import { format } from "date-fns";

const CustomToolbar = ({ handleOpenModal }) => {
  return (
    <>
      {/* Add your custom button */}
      <ArgonBox style={{ textAlign: "right", marginBottom: "30px" }}>
        <ArgonButton variant="contained" style={{}} color="info" onClick={handleOpenModal}>
          New Appointment
        </ArgonButton>
      </ArgonBox>
    </>
  );
};

function Default() {
  const [openModal, setOpenModal] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const [allPatient, setAllPatient] = useState([]);
  const [isGroupSession, setIsGroupSession] = useState({
    value: "",
    label: "",
  });
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(true);
  const [allAppointments, setAllApointments] = useState([]);
  const [events, setEvents] = useState([]);

  const localizer = momentLocalizer(moment);
  const formatTime = (date) => format(new Date(date), "HH:mm");

  const [selectedStaff, setSelectedStaff] = useState({
    value: "",
    label: "",
  });

  const staffOptions = allStaff.map((staff) => ({
    label: `${staff.name_first} ${staff.name_last}`, // Display the full name
    value: staff.id, // Use the id or any unique value as the option's value
  }));

  const [selectedPatient, setSelectedPatient] = useState([]);

  const PatientOptions = allPatient.map((patient) => ({
    label: `${patient.name_first} ${patient.name_last}`, // Display the full name
    value: patient.id, // Use the id or any unique value as the option's value
  }));

  const handleOpenModal = () => {
    setSelectedPatient([]);
    setDepartment("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setSelectedStaff({
      value: "",
      label: "",
    });
    setIsGroupSession({
      value: "",
      label: "",
    });
    setOpenModal(!openModal);
    if (!openModal) {
      getAllServices();
    }
  };

  const handleShowMore = () => {
    alert("clicked");
  };

  // Handle selection change for ArgonSelect
  const handleStaffChange = (event) => {
    setSelectedStaff({
      value: event.value,
      label: event.label,
    });
  };
  const handlePatientChange = (selectedOptions) => {
    if (isGroupSession === "yes") {
      // For multiple selection (array of options)
      setSelectedPatient(
        selectedOptions.map((option) => ({
          value: option.value,
          label: option.label,
        }))
      );
    } else {
      // For single selection
      if (selectedOptions.length > 0) {
        const latestSelectedOption = selectedOptions[selectedOptions.length - 1]; // Get the latest selected option
        setSelectedPatient([
          { value: latestSelectedOption.value, label: latestSelectedOption.label },
        ]);
      } else {
        // If no options are selected, reset the selected patient
        setSelectedPatient([]);
      }
    }
  };

  const handleIsrecurringChange = (e) => {
    debugger;
    setIsRecurring(e.target.checked);
  };

  // console.log("Selected Patients: ", selectedPatient);
  // console.log("isGroupSession: ", isGroupSession);
  // console.log("department: ", department);
  const handleIsGroupSessionChange = (selectedOption) => {
    debugger;
    setIsGroupSession(selectedOption.value);
    if (isGroupSession === "no") {
      setSelectedPatient([]); // Reset selection when switching to single patient mode
    }
  };

  const handleStartDate = (date) => {
    // Check if the date is valid
    if (date) {
      // Extracting date and time
      const formattedDate = date.toLocaleDateString(); // e.g., "10/2/2024"
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }); // e.g., "12:00:00 PM"

      // Update the states
      setStartDate(formattedDate);
      setStartTime(formattedTime);
    }
  };

  const handleEndDate = (date) => {
    // Check if the date is valid
    if (date) {
      // Extracting date and time
      const formattedDate = date.toLocaleDateString(); // e.g., "10/2/2024"
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }); // e.g., "12:00:00 PM"

      // Update the states
      setEndDate(formattedDate);
      setEndTime(formattedTime);
    }
  };

  // console.log("start date: ", startDate);
  // console.log("start time: ", startTime);
  // console.log("end date: ", endDate);
  // console.log("end time: ", endTime);

  const getAllStaff = async () => {
    let dbops = new dbOps();
    const data = {};
    try {
      const result = await dbops.getAllStaff(data);
      if (result && result.data) {
        setAllStaff(result.data); // Save the list of doctors in state
      }
    } catch (error) {
      console.error("Error fetching staff data", error);
    }
  };

  const getAllPatient = async () => {
    let dbops = new dbOps();
    const data = {};
    try {
      const result = await dbops.getAllPatients(data);
      if (result && result.data) {
        setAllPatient(result.data); // Save the list of doctors in state
      }
    } catch (error) {
      console.error("Error fetching staff data", error);
    }
  };

  const getAllAppointments = async () => {
    let dbops = new dbOps();
    const data = {};
    // Await the result of the postRequest to resolve the Promise
    const result = await dbops.getAllAppointments(data);
    // Now you can set the appointments with the resolved data
    if (result && result.data) {
      setAllApointments(result.data); // Ensure `result.data` exists before using it
    }
  };

  const addNewAppointment = async () => {
    //debugger;
    const data = {
      isRecurring: isRecurring,
      department: department,
      isGroupSession: isGroupSession,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      staff: selectedStaff,
      patient: selectedPatient,
    };

    let dbops = new dbOps();
    let result = await dbops.addNewAppointment(data);
    debugger;
    if (result?.message === "SUCCESS") {
      setOpenModal(false);
      await showSuccessMessage("Appointment Created Successfully!");
    } else {
    }
  };

  const getAllServices = async () => {
    const data = {};
    let dbops = new dbOps();

    try {
      let res = await dbops.getAllServices(data);

      if (res?.message === "SUCCESS") {
        const services = (res.data || []).map((service) => ({
          id: service.id,
          label: service.name,
        }));

        setDepartmentOptions(services);
      } else {
        console.warn("No data found.");
        setDataTableData((prevState) => ({
          ...prevState,
          rows: [],
        }));
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getAllAppointments();
    getAllStaff();
    getAllPatient();
    getAllServices();
  }, []);

  useEffect(() => {
    // Transform the appointments into events for the calendar
    const transformedEvents = allAppointments?.map((appointment) => {
      debugger;
      // Combine the start_date with start_time and end_date with end_time
      // const start = new Date(`${appointment.start_date.split("T")[0]}T${appointment.start_time}`);
      // const end = new Date(`${appointment.end_date.split("T")[0]}T${appointment.end_time}`);
      const start = new Date(appointment.start_date_time);
      const end = new Date(appointment.end_date_time);

      // const start = appointment.start_time;
      // const end = appointment.end_time;
      return {
        title: `${start.toLocaleString()} - ${end.toLocaleString()}`,
        start,
        end,
        allDay: false, // Set this based on your data if necessary
        department: appointment.department, // Additional info if needed
      };
    });

    setEvents(transformedEvents);
  }, [allAppointments]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox>
        <Grid>
          <Card
            style={{
              marginTop: "5rem",
              borderRadius: "15px",
              boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Calendar
              localizer={localizer}
              defaultDate={new Date()}
              events={events}
              views={{ month: true }} // Only show month view
              components={{
                toolbar: (props) => <CustomToolbar handleOpenModal={handleOpenModal} {...props} />,
              }}
              style={{
                height: "90vh",
                padding: "50px",
                fontSize: "16px", // Change font size
                fontFamily: "Open Sans",
                color: "#353935",
              }}
              onShowMore={handleShowMore}
              eventPropGetter={(event, start, end, isSelected) => {
                const backgroundColor = isSelected ? "white-smoke" : "grey"; // Custom event colors
                return {
                  style: {
                    backgroundColor,
                    color: "white",
                    padding: "2px",
                    fontSize: "10px",
                  },
                };
              }}
            />

            {openModal && (
              <Card>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleOpenModal}
                  closeAfterTransition
                  sx={{ zIndex: 1300 }} // Increase the zIndex here
                >
                  <Fade in={open}>
                    <ArgonBox
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100vw",
                        height: "100vh",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Card
                        sx={{
                          padding: "20px",
                          display: "flex",
                          left: "20%",
                          top: "10%",
                          boxShadow: 15, // MUI shadow level 3 for subtle shadow (can also use custom values)
                          maxWidth: "60%",
                          height: "80%",
                          border: "3px solid #344767",
                          borderRadius: "8px", // Rounded corners for the card
                          backgroundColor: "white", // Ensure the card has a white background
                        }}
                      >
                        <ArgonBox sx={{ marginBottom: 5 }}>
                          <ArgonBox
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <ArgonTypography id="title" variant="h4">
                              Add New Appointment
                            </ArgonTypography>
                            <FormControlLabel
                              control={<Switch defaultChecked onChange={handleIsrecurringChange} />}
                              label="Recurring" // Visible label for the Switch
                              labelPlacement="start" // Label is placed at the start (to the right of the switch)
                            />
                          </ArgonBox>
                        </ArgonBox>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <ArgonTypography sx={{ fontSize: "0.875rem" }}>
                              Department:
                            </ArgonTypography>
                            <ArgonSelect
                              variant="outlined"
                              options={departmentOptions}
                              onChange={(e) => setDepartment(e.label)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <ArgonTypography sx={{ fontSize: "0.875rem" }}>
                              Is Group Session:
                            </ArgonTypography>
                            <ArgonSelect
                              type="password"
                              label="Email"
                              variant="outlined"
                              options={selectData.isGroupOptions}
                              onChange={handleIsGroupSessionChange}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <ArgonTypography sx={{ fontSize: "0.875rem" }}>
                              Start Date:
                            </ArgonTypography>
                            <ArgonBox sx={{ display: "flex", flexWrap: "wrap" }}>
                              <DatePicker
                                format="dd MMM yyyy hh:mm:ss aa"
                                placeholder="Start Date..."
                                showMeridian
                                caretAs={FaCalendar} // Use a valid icon component for caret
                                onChange={handleStartDate}
                                size="lg"
                                style={{
                                  width: "100%", // Ensure it takes full width
                                }}
                                menuStyle={{
                                  zIndex: 1400,
                                  maxHeight: "250px", // Decrease the maximum height for the popup
                                  overflowY: "auto", // Enable vertical scrolling if the content exceeds max height
                                  // paddingBottom: "20px", // Adjust bottom padding to ensure button visibility
                                }}
                              />
                            </ArgonBox>
                          </Grid>

                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <ArgonTypography sx={{ fontSize: "0.875rem" }}>
                              End Date:
                            </ArgonTypography>
                            <ArgonBox sx={{ display: "flex", flexWrap: "wrap" }}>
                              <DatePicker
                                format="dd MMM yyyy hh:mm:ss aa"
                                placeholder="End Date..."
                                showMeridian
                                caretAs={FaCalendar} // Use a valid icon component for caret
                                autoOk={true}
                                onChange={handleEndDate}
                                size="lg"
                                style={{
                                  width: "100%", // Ensure it takes full width
                                }}
                                menuStyle={{
                                  zIndex: 1400,
                                  maxHeight: "250px", // Decrease the maximum height for the popup
                                  overflowY: "auto", // Enable vertical scrolling if the content exceeds max height
                                  // paddingBottom: "20px", // Adjust bottom padding to ensure button visibility
                                }}
                              />
                            </ArgonBox>
                          </Grid>

                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <ArgonTypography sx={{ fontSize: "0.875rem" }}>
                              Select Staff:
                            </ArgonTypography>

                            <ArgonSelect
                              variant="contained"
                              options={staffOptions}
                              placeholder={selectedStaff.label}
                              value={selectedStaff.value} // Set the selected value
                              onChange={handleStaffChange} // Optional: handle selection
                            ></ArgonSelect>
                          </Grid>

                          {/* Second Input */}
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <ArgonTypography sx={{ fontSize: "0.875rem" }}>
                              Select Patient:
                            </ArgonTypography>

                            <ArgonSelect
                              variant="outlined"
                              options={PatientOptions}
                              placeholder="Select Patient"
                              isMulti={isGroupSession ? true : false}
                              value={selectedPatient} // Ensure value is an array of IDs
                              renderValue={(selected) => (
                                <ArgonBox sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                  {selected.map((value) => {
                                    const patient = PatientOptions.find(
                                      (option) => option.value === value
                                    );
                                    return (
                                      <Chip
                                        style={{
                                          width: "auto",
                                          backgroundColor: "white", // White background
                                          color: "black", // Black text color
                                          border: "1px solid black", // Black border
                                        }}
                                        key={value}
                                        label={patient ? patient.label : value}
                                      />
                                    );
                                  })}
                                </ArgonBox>
                              )}
                              onChange={handlePatientChange} // Update selected patients
                            >
                              {PatientOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </ArgonSelect>
                          </Grid>
                        </Grid>
                        <ArgonBox
                          sx={{ marginTop: 1, display: "flex", justifyContent: "flex-end", gap: 2 }}
                        >
                          <ArgonButton
                            color="info"
                            onClick={addNewAppointment}
                            sx={{
                              padding: "8px 16px", // Padding for the button
                              borderRadius: "8px", // Rounded corners
                            }}
                          >
                            Add
                          </ArgonButton>
                          <ArgonButton
                            onClick={handleOpenModal}
                            sx={{
                              backgroundColor: "secondary.main", // Use theme's secondary color
                              color: "white",
                              padding: "8px 16px",
                              borderRadius: "8px",
                              "&:hover": {
                                backgroundColor: "secondary.dark", // Darker shade on hover
                              },
                            }}
                          >
                            Cancel
                          </ArgonButton>
                        </ArgonBox>
                      </Card>
                    </ArgonBox>
                  </Fade>
                </Modal>
              </Card>
            )}
          </Card>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

CustomToolbar.propTypes = {
  handleOpenModal: PropTypes.func.isRequired, // Ensure handleOpenModal is a function and required
};
export default Default;
