import PropTypes from "prop-types";
import { Card, Icon } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ReportChart from "./ReportChart";

function ReportCard({ title, description, data, type, icon }) {
  const hasData = data && Array.isArray(data) && data.length > 0;

  return (
    <Card
      sx={{
        height: "100%",
        backgroundColor: "white",
        borderRadius: "15px",
        boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <ArgonBox p={3}>
        <ArgonBox display="flex" alignItems="center" mb={2}>
          <ArgonBox
            display="grid"
            alignItems="center"
            justifyContent="center"
            bgColor="info"
            color="white"
            width="4rem"
            height="4rem"
            shadow="md"
            borderRadius="lg"
            variant="gradient"
          >
            <Icon fontSize="default">{icon}</Icon>
          </ArgonBox>
          <ArgonBox ml={2}>
            <ArgonTypography variant="h5" fontWeight="bold">
              {title}
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              {description}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>

        {hasData ? (
          <ReportChart data={data} type={type} />
        ) : (
          <ArgonBox display="flex" alignItems="center" justifyContent="center" minHeight="200px">
            <ArgonTypography variant="button" color="text">
              {data === null ? "Loading data..." : "No data available"}
            </ArgonTypography>
          </ArgonBox>
        )}
      </ArgonBox>
    </Card>
  );
}

ReportCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.any,
  type: PropTypes.oneOf(["service", "staff", "customer", "system"]).isRequired,
  icon: PropTypes.string.isRequired,
};

export default ReportCard;
