import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
// Argon Dashboard 2 MUI Examples
import DataTable from "examples/Tables/DataTable";
import { Icon, Grid, Card } from "@mui/material";
import dbOps from "libs/dbops";

export default function Services() {
  const [loading, setLoading] = React.useState(false);
  const [dataTableData, setDataTableData] = React.useState({
    columns: [
      { Header: "Name", accessor: "name" }, // Name of the service
      { Header: "Price", accessor: "price" }, // Price of the service
      { Header: "Category", accessor: "category" }, // Category of the service
      {
        Header: "Action",
        accessor: "action",
        align: "center",
        Cell: (props) => (
          <ArgonBox style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon
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
            </Icon>
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

  React.useEffect(() => {
    getAllPateints();
  }, []);

  const getAllPateints = async () => {
    setLoading(true);
    const data = {};
    let dbops = new dbOps();
    let res = await dbops.getAllServices(data);
    debugger;
    if ((res.message = "SUCCESS")) {
      const mappedRows = res.data.map((patient) => ({
        first_Name: patient.name_first,
        last_Name: patient.name_last,
        email: patient.email,
        phone: patient.mobile,
        department: patient.department,
        action: "", // this will be handled by your "Action" column's Cell
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
              handleFormOpen={true}
              label="Add Service"
            />
          </Card>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

{
  /* <ServicesTable /> */
}
