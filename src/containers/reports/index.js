import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportCard from "./components/ReportCard";
import ReportFilter from "./components/ReportFilter";
import dbOps from "libs/dbops";
import { Card } from "@mui/material";
import { format } from "date-fns";

function Reports() {
  const [reports, setReports] = useState({
    serviceUsage: null,
    staffPerformance: null,
    customerUsage: null,
    systemPerformance: null,
  });
  const [filterParams, setFilterParams] = useState({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    groupBy: "service", // default grouping
  });

  const fetchReports = async () => {
    const dbops = new dbOps();
    debugger;
    try {
      // Fetch all reports in parallel
      const [serviceUsage, staffPerformance, customerUsage, systemPerformance] = await Promise.all([
        dbops.getServiceUsageReport(filterParams),
        dbops.getStaffPerformanceReport(filterParams),
        dbops.getCustomerServiceUsageReport(filterParams),
        dbops.getSystemPerformanceReport(filterParams),
      ]);

      setReports({
        serviceUsage: serviceUsage?.data || null,
        staffPerformance: staffPerformance?.data || null,
        customerUsage: customerUsage?.data || null,
        systemPerformance: systemPerformance?.data || null,
      });
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filterParams]);

  const handleFilterChange = (newFilters) => {
    setFilterParams((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Card
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <ReportFilter onFilterChange={handleFilterChange} />
        </Card>

        <Grid container spacing={3}>
          {/* Service Usage Report */}
          <Grid item xs={12} md={6}>
            <ReportCard
              title="Service Usage"
              description="Service utilization across the system"
              data={reports.serviceUsage}
              type="service"
              icon="analytics"
            />
          </Grid>

          {/* Staff Performance Report */}
          <Grid item xs={12} md={6}>
            <ReportCard
              title="Staff Performance"
              description="Staff performance metrics and analytics"
              data={reports.staffPerformance}
              type="staff"
              icon="people"
            />
          </Grid>

          {/* Customer Service Usage */}
          <Grid item xs={12} md={6}>
            <ReportCard
              title="Customer Service Usage"
              description="Analysis of customer service utilization"
              data={reports.customerUsage}
              type="customer"
              icon="person"
            />
          </Grid>

          {/* System Performance */}
          <Grid item xs={12} md={6}>
            <ReportCard
              title="System Performance"
              description="Overall system performance metrics"
              data={reports.systemPerformance}
              type="system"
              icon="assessment"
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Reports;
