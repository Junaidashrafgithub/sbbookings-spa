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

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";
import DataTable from "../../examples/Tables/DataTable/index";
import ArgonTypography from "components/ArgonTypography";

function Default() {
  const { size } = typography;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DataTable />
    </DashboardLayout>
  );
}

export default Default;
