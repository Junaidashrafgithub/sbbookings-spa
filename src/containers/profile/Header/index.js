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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// Argon Dashboard 2 MUI example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Argon Dashboard 2 MUI base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import PropTypes from "prop-types";
import dbOps from "libs/dbops";

function Header({ img, name, role, email }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [image, setImage] = useState(burceMars);
  console.log("image", image);

  const handleImageChange = async (event) => {
    debugger;
    const file = event.target.files[0];
    if (file) {
      let dbops = new dbOps();
      const data = {
        email: email,
        image: image,
      };
      let res = await dbops.updateProfile(data);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <ArgonBox position="relative">
      <DashboardNavbar absolute light />
      <ArgonBox height="220px" />
      <Card
        sx={{
          py: 2,
          px: 2,
          boxShadow: ({ boxShadows: { md } }) => md,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <ArgonBox position="relative">
              <ArgonAvatar
                src={image}
                alt="profile-image"
                variant="rounded"
                size="xl"
                shadow="sm"
                sx={
                  {
                    // Positions the image to focus on the top (use "center center" for center focus)
                  }
                }
              />
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <IconButton
                color="primary"
                component="label"
                htmlFor="fileInput"
                sx={{
                  objectFit: "cover", // Ensures the image covers the entire avatar area
                  objectPosition: "center top",
                  fontSize: "x-small",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "background.paper",
                  border: "2px solid white",
                  "&:hover": {
                    backgroundColor: "background.paper",
                  },
                }}
              >
                <CameraAltIcon />
              </IconButton>
            </ArgonBox>
          </Grid>
          <Grid item>
            <ArgonBox height="100%" mt={0.5} lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                {name}
              </ArgonTypography>
              <ArgonTypography variant="button" color="text" fontWeight="medium">
                {role}
              </ArgonTypography>
            </ArgonBox>
          </Grid>
          {
            <Grid item xs={12} md={6} lg={2} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                  <Tab
                    label="Settings"
                    icon={
                      <i
                        className="ni ni-settings-gear-65"
                        style={{ marginTop: "6px", marginRight: "8px" }}
                      />
                    }
                  />
                </Tabs>
              </AppBar>
            </Grid>
          }
        </Grid>
      </Card>
    </ArgonBox>
  );
}

Header.propTypes = {
  img: PropTypes.image,
  name: PropTypes.string,
  role: PropTypes.string,
  email: PropTypes.string,
};

export default Header;
