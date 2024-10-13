import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";

export default function Reports() {
  return (
    <ArgonBox>
      <DashboardLayout>
        <DashboardNavbar />
      </DashboardLayout>
    </ArgonBox>
  );
}
