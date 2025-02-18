import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useTheme } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const tooltipStyle = {
  backgroundColor: "white",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  fontSize: "12px",
};

const ServiceTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyle}>
        <p style={{ margin: "0 0 5px", fontWeight: "bold" }}>Service: {label}</p>
        <p style={{ margin: "0 0 5px", color: "#8884d8" }}>Appointments: {payload[0].value}</p>
        <p style={{ margin: "0", color: "#82ca9d" }}>Unique Customers: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

ServiceTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

const StaffTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyle}>
        <p style={{ margin: "0 0 5px", fontWeight: "bold" }}>Staff Member: {label}</p>
        <p style={{ margin: "0 0 5px", color: "#00C49F" }}>Completed: {payload[0].value}</p>
        <p style={{ margin: "0 0 5px", color: "#FF8042" }}>Cancelled: {payload[1].value}</p>
        <p style={{ margin: "0", color: "#0088FE" }}>Hours Worked: {payload[2].value}h</p>
      </div>
    );
  }
  return null;
};

StaffTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

const CustomerTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyle}>
        <p style={{ margin: "0 0 5px", fontWeight: "bold" }}>Customer: {label}</p>
        <p style={{ margin: "0 0 5px", color: COLORS[0] }}>Appointments: {payload[0].value}</p>
        <p style={{ margin: "0", color: COLORS[1] }}>Hours Used: {payload[1].value}h</p>
      </div>
    );
  }
  return null;
};

CustomerTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

const SystemTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyle}>
        <p style={{ margin: "0 0 5px", fontWeight: "bold" }}>Week of: {label}</p>
        <p style={{ margin: "0 0 5px", color: "#8884d8" }}>
          Total Appointments: {payload[0].value}
        </p>
        <p style={{ margin: "0", color: "#82ca9d" }}>Completion Rate: {payload[1].value}%</p>
      </div>
    );
  }
  return null;
};

SystemTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

function ReportChart({ data, type }) {
  const theme = useTheme();

  const formatChartData = () => {
    if (!data || !data.length) {
      console.log("No data received for:", type);
      return [];
    }

    console.log("Formatting data for type:", type, data); // Debug log

    switch (type) {
      case "service":
        return data.map((item) => ({
          name: item.service,
          appointments: parseInt(item.total_appointments),
          customers: parseInt(item.unique_customers),
        }));

      case "staff":
        return data.map((item) => ({
          name: item.staff_name,
          completed: parseInt(item.completed_appointments),
          cancelled: parseInt(item.cancelled_appointments),
          hours: parseFloat(item.total_hours_worked).toFixed(1),
        }));

      case "customer":
        return data.map((item) => ({
          name: item.customer_name,
          appointments: parseInt(item.total_appointments),
          hours: parseFloat(item.total_hours_used).toFixed(1),
        }));

      case "system":
        return data.map((item) => ({
          name: new Date(item.time_period).toLocaleDateString(),
          appointments: parseInt(item.total_appointments),
          completion: parseFloat(item.completion_rate).toFixed(1),
        }));

      default:
        console.log("Unknown chart type:", type);
        return [];
    }
  };

  const renderServiceChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formatChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tick={{ fontSize: 12 }} />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{ fontSize: 12 }} />
        <Tooltip content={<ServiceTooltip />} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar yAxisId="left" dataKey="appointments" fill="#8884d8" name="Appointments" />
        <Bar yAxisId="right" dataKey="customers" fill="#82ca9d" name="Unique Customers" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderStaffChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formatChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<StaffTooltip />} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="completed" fill="#00C49F" name="Completed" />
        <Bar dataKey="cancelled" fill="#FF8042" name="Cancelled" />
        <Bar dataKey="hours" fill="#0088FE" name="Hours Worked" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderCustomerChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formatChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomerTooltip />} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="appointments" fill={COLORS[0]} name="Total Appointments" />
        <Bar dataKey="hours" fill={COLORS[1]} name="Hours Used" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderSystemChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formatChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tick={{ fontSize: 12 }} />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{ fontSize: 12 }} />
        <Tooltip content={<SystemTooltip />} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar yAxisId="left" dataKey="appointments" fill="#8884d8" name="Total Appointments" />
        <Bar yAxisId="right" dataKey="completion" fill="#82ca9d" name="Completion Rate %" />
      </BarChart>
    </ResponsiveContainer>
  );

  if (!data || !data.length) {
    console.log("Empty data received for chart type:", type);
    return (
      <ArgonBox display="flex" alignItems="center" justifyContent="center" minHeight="200px">
        <ArgonTypography variant="button" color="text">
          No data available
        </ArgonTypography>
      </ArgonBox>
    );
  }

  const chartMap = {
    service: renderServiceChart,
    staff: renderStaffChart,
    customer: renderCustomerChart,
    system: renderSystemChart,
  };

  return chartMap[type]();
}

ReportChart.propTypes = {
  data: PropTypes.array,
  type: PropTypes.oneOf(["service", "staff", "customer", "system"]).isRequired,
};

export default ReportChart;
