import * as React from "react";
import PropTypes from "prop-types";
import Popover from "@mui/material/Popover";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ErrorIcon from "@mui/icons-material/Error";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Collapse } from "@mui/material";
import { useState } from "react";
import { format } from "date-fns";
import ArgonBox from "components/ArgonBox";

function ConflictPopover({ conflicts = [] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [patientOpen, setPatientOpen] = useState(false);

  const handleClick = (event) => {
    debugger;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "conflict-popover" : undefined;

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy hh:mm a");
  };

  return (
    <div>
      <ArgonButton
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        color={conflicts.length === 0 ? "info" : "error"}
        startIcon={<ErrorIcon />}
        disabled={conflicts.length === 0}
      >
        View Conflicts
      </ArgonButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ArgonBox
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            border: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <ArgonTypography variant="h6" sx={{ color: "error.main", fontSize: 14 }}>
            Scheduling Conflicts
          </ArgonTypography>
          {conflicts.length === 0 ? (
            <ArgonTypography variant="body2" sx={{ fontSize: 12 }}>
              No data
            </ArgonTypography>
          ) : (
            <ArgonBox sx={{ width: 320 }}>
              <ArgonBox sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccessTimeIcon sx={{ fontSize: 16, mr: 1 }} />
                <ArgonTypography variant="body2" sx={{ fontSize: 12, fontWeight: "bold" }}>
                  {formatDateTime(conflicts[0].startDateTime)} -{" "}
                  {formatDateTime(conflicts[0].endDateTime)}
                </ArgonTypography>
              </ArgonBox>
              {conflicts.map((conflict, index) => (
                <ArgonBox key={index}>
                  {conflict.type === "Doctor" && conflict.name ? (
                    <ArgonBox>
                      <ArgonButton
                        variant="text"
                        onClick={() => setDoctorOpen((prev) => !prev)}
                        color="info"
                        fullWidth
                        sx={{
                          textTransform: "none",
                          fontSize: 14,
                        }}
                      >
                        Doctor
                      </ArgonButton>
                      <Collapse in={doctorOpen}>
                        <ArgonBox sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <ArgonTypography variant="body2" sx={{ flexGrow: 1 }}>
                            {conflict.name}
                          </ArgonTypography>
                          <ArgonBox
                            sx={{ width: 8, height: 8, bgcolor: "red", borderRadius: "50%" }}
                          />
                        </ArgonBox>
                      </Collapse>
                    </ArgonBox>
                  ) : (
                    <ArgonBox>
                      <ArgonButton
                        variant="text"
                        onClick={() => setPatientOpen((prev) => !prev)}
                        color="info"
                        fullWidth
                        sx={{
                          textTransform: "none",
                          fontSize: 14,
                        }}
                      >
                        Patients
                      </ArgonButton>
                      {/* {conflict.type === "Patient" && conflict.names?.length > 0 && ( */}
                      <Collapse in={patientOpen}>
                        {conflict.names.map((name, idx) => (
                          <ArgonBox key={idx} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <ArgonTypography variant="body2" sx={{ flexGrow: 1 }}>
                              {name}
                            </ArgonTypography>
                            <ArgonBox
                              sx={{ width: 8, height: 8, bgcolor: "red", borderRadius: "50%" }}
                            />
                          </ArgonBox>
                        ))}
                      </Collapse>
                    </ArgonBox>
                  )}
                </ArgonBox>
              ))}
            </ArgonBox>
          )}
        </ArgonBox>
      </Popover>
    </div>
  );
}

ConflictPopover.propTypes = {
  conflicts: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string,
        names: PropTypes.arrayOf(PropTypes.string),
        startDateTime: PropTypes.string.isRequired,
        endDateTime: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
};

export default ConflictPopover;
