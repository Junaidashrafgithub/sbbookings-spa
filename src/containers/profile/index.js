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
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import ArgonInput from "components/ArgonInput";
import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import ArgonButton from "components/ArgonButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "reducer/Store";
import dbOps from "libs/dbops";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "./Header";

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Profile() {
  debugger;
  const navigate = useNavigate();
  // const user = store.getState().userInfo;
  const user = useSelector((state) => state.userInfo);
  const img = user.img;

  const [openModel, setopenModel] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [newPassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isMatch = confirmPassword !== "" && newPassword === confirmPassword;
  const [picture, setPicture] = useState(img);
  const name = `${user.first_name} ${user.last_name}`;

  useEffect(() => {
    if (user && user.email) {
      getUserInfo();
    }
  }, [user]);

  const getUserInfo = async () => {
    try {
      let dbops = new dbOps();
      const data = {
        email: user.email,
      };

      let res = await dbops.getUserInfo(data);

      if (res && res.data) {
        setUserInfo(res.data);
      } else {
        console.error("Error: No data returned from the server", res);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleOpenModel = () => {
    setopenModel(!openModel);
    setNewpassword("");
    setConfirmPassword("");
  };

  const BorderColor = () => {
    if (confirmPassword === "") return "default"; // Default color before typing
    return newPassword === confirmPassword ? "green" : "red";
  };

  const handleSubmit = async () => {
    debugger;
    if (newPassword !== confirmPassword) {
      //<AlertBox icon="error" title="Oops..." text="Passwords don't match!" />;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords don't match!",
        position: "top", // This sets the alert to appear at the top
        toast: true,
      });
      return;
    }

    const data = {
      email: userInfo.email,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    let dbops = new dbOps();
    let res = await dbops.changePassword(data);
    if (res.message === "SUCCESS") {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password Changed Successfully!",
        position: "top", // This sets the alert to appear at the top
      }).then(() => {
        navigate("/auth/signin");
      });
    }
  };

  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Header picture={picture} name={name} role={userInfo.role} email={userInfo.email} />
      <Card
        sx={{
          margin: "auto",
          mt: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: { sm: "100%", md: "100%", lg: "70%" },
          padding: 5,
        }}
      >
        <ArgonBox>
          <ArgonBox sx={{ ml: 5, mt: 5, display: "flex", justifyContent: "space-between" }}>
            <ArgonTypography variant="h4">Personel Details</ArgonTypography>
            <ArgonButton sx={{ backgroundColor: "primary.main" }} onClick={handleOpenModel}>
              Change Password
            </ArgonButton>
          </ArgonBox>

          <Grid container spacing={2} sx={{ padding: 10 }}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "0.875rem" }}>First Name:</Typography>
              <ArgonInput
                disabled
                label="First Name"
                variant="outlined"
                value={userInfo.name_first}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "0.875rem" }}>Last Name:</Typography>
              <ArgonInput
                disabled
                label="Last Name"
                variant="outlined"
                value={userInfo.name_last}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "0.875rem" }}>Email:</Typography>
              <ArgonInput disabled label="Email" variant="outlined" value={userInfo.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "0.875rem" }}>Address:</Typography>
              <ArgonInput disabled label="Address" variant="outlined" value={userInfo.address} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "0.875rem" }}>Role:</Typography>
              <ArgonInput disabled label="Address" variant="contained" value={userInfo.role} />
            </Grid>
          </Grid>

          {openModel && (
            <Card>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleOpenModel}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <ArgonBox sx={style}>
                    <ArgonBox sx={{ marginBottom: 5 }}>
                      <Typography id="title" variant="h6">
                        Change Password
                      </Typography>
                    </ArgonBox>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <Typography sx={{ fontSize: "0.875rem" }}>Your Email:</Typography>
                        <ArgonInput
                          disabled
                          label="First Name"
                          variant="outlined"
                          value={userInfo.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Typography sx={{ fontSize: "0.875rem" }}>New Password:</Typography>
                        <ArgonInput
                          type="password"
                          label="Last Name"
                          variant="outlined"
                          onChange={(e) => setNewpassword(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Typography sx={{ fontSize: "0.875rem" }}>Confirm Password:</Typography>
                        <ArgonInput
                          type="password"
                          label="Email"
                          variant="outlined"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          sx={{
                            borderColor: BorderColor(),
                            transition: "border-color 0.3s ease",
                            "& input": {
                              borderColor: BorderColor(),
                            },
                          }}
                        />
                        {!isMatch && confirmPassword !== "" && (
                          <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                            Passwords do not match
                          </Typography>
                        )}
                      </Grid>
                    </Grid>

                    <ArgonBox
                      sx={{ marginTop: 1, display: "flex", justifyContent: "flex-end", gap: 2 }}
                    >
                      <ArgonButton
                        onClick={handleSubmit}
                        sx={{
                          backgroundColor: "primary.main", // Use theme's primary color
                          color: "white", // Text color
                          padding: "8px 16px", // Padding for the button
                          borderRadius: "8px", // Rounded corners
                          "&:hover": {
                            backgroundColor: "primary.dark", // Darker shade on hover
                          },
                        }}
                      >
                        Update
                      </ArgonButton>
                      <ArgonButton
                        onClick={handleOpenModel}
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
                  </ArgonBox>
                </Fade>
              </Modal>
            </Card>
          )}
        </ArgonBox>
      </Card>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Profile;
