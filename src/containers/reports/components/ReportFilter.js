import { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import { DatePicker } from "rsuite";
import { FaCalendar } from "react-icons/fa";
import "rsuite/dist/rsuite.min.css";

function ReportFilter({ onFilterChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [groupBy, setGroupBy] = useState("service");
  const [dateError, setDateError] = useState("");

  const validateDates = (start, end) => {
    debugger;
    if (start && end) {
      const startDateTime = new Date(start);
      const endDateTime = new Date(end);

      // Reset time components for accurate date comparison
      startDateTime.setHours(0, 0, 0, 0);
      endDateTime.setHours(0, 0, 0, 0);

      if (endDateTime <= startDateTime) {
        setDateError("End date must be after start date");
        return false;
      } else {
        setDateError("");
        return true;
      }
    }
    return true; // Return true if either date is not set yet
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    if (validateDates(date, endDate)) {
      onFilterChange({ startDate: date });
    }
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    if (validateDates(startDate, date)) {
      onFilterChange({ endDate: date });
    }
  };

  const handleGroupByChange = (selected) => {
    setGroupBy(selected.value);
    onFilterChange({ groupBy: selected.value });
  };

  const groupByOptions = [
    { value: "service", label: "Service" },
    { value: "staff", label: "Staff" },
    { value: "customer", label: "Customer" },
    { value: "location", label: "Location" },
  ];

  return (
    <ArgonBox>
      <ArgonTypography variant="h6" mb={3}>
        Report Filters
      </ArgonTypography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ArgonTypography variant="caption">Start Date</ArgonTypography>
          <DatePicker
            format="yyyy-MM-dd"
            placeholder="Select start date..."
            value={startDate}
            onChange={handleStartDate}
            style={{ width: "100%" }}
            caretAs={FaCalendar}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ArgonTypography variant="caption">End Date</ArgonTypography>
          <DatePicker
            format="yyyy-MM-dd"
            placeholder="Select end date..."
            value={endDate}
            onChange={handleEndDate}
            style={{ width: "100%" }}
            caretAs={FaCalendar}
          />
          {dateError && (
            <ArgonTypography
              variant="caption"
              color="error"
              style={{
                display: "block",
                marginTop: "4px",
                fontSize: "12px",
              }}
            >
              {dateError}
            </ArgonTypography>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <ArgonTypography variant="caption">Group By</ArgonTypography>
          <ArgonSelect
            options={groupByOptions}
            value={groupBy}
            onChange={handleGroupByChange}
            placeholder="Select grouping..."
          />
        </Grid>
      </Grid>
    </ArgonBox>
  );
}

ReportFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default ReportFilter;
