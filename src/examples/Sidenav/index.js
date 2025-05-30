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

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import SidenavItem from "examples/Sidenav/SidenavItem";
import SidenavFooter from "examples/Sidenav/SidenavFooter";
import SidenavList from "./SidenavList";
import SidenavCollapse from "examples/Sidenav/SidenavFooter";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Argon Dashboard 2 MUI context
import { useArgonController, setMiniSidenav } from "context";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkSidenav, layout } = controller;
  const location = useLocation();
  const { pathname } = location;

  const collapseName = pathname.split("/").slice(1)[0];
  const itemName = pathname.split("/").slice(1)[0];

  const isUserLoggedIn = useSelector((state) => state.userInfo.isUserLoggedIn);

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    //handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const renderNestedCollapse = (collapse) => {
    return collapse
      .map(({ name, route, key, href }) => {
        if (key === plan.plan) {
          return href ? (
            <Link key={key} href={href} target="_blank" rel="noreferrer">
              <SidenavItem name={name} nested />
            </Link>
          ) : (
            <NavLink to={route} key={key}>
              <SidenavItem name={name} active={route === pathname} nested />
            </NavLink>
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;
      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            name={name}
            active={key === itemName}
            open={openNestedCollapse === name}
            onClick={() =>
              openNestedCollapse === name
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(name)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        if (plan.length >= 0) {
          plan.forEach((element) => {
            if (element.plan === name) {
              returnValue = href ? (
                <Link href={href} key={key} target="_blank" rel="noreferrer">
                  <SidenavItem name={name} active={key === itemName} />
                </Link>
              ) : (
                <NavLink to={route} key={key}>
                  <SidenavItem name={name} active={key === itemName} />
                </NavLink>
              );
            }
          });
        } else {
          returnValue = href ? (
            <Link href={href} key={key} target="_blank" rel="noreferrer">
              <SidenavItem name={name} active={key === itemName} />
            </Link>
          ) : (
            <NavLink to={route} key={key}>
              <SidenavItem name={name} active={key === itemName} />
            </NavLink>
          );
        }
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  // const renderRoutes = routes.map(({ type, name, icon, title, key, href, route }) => {
  //   let returnValue;

  //   if (type === "route") {
  //     if (href) {
  //       returnValue = (
  //         <Link href={href} key={key} target="_blank" rel="noreferrer">
  //           <SidenavItem
  //             name={name}
  //             icon={icon}
  //             active={key === itemName}
  //             noCollapse={noCollapse}
  //           />
  //         </Link>
  //       );
  //     } else {
  //       returnValue = (
  //         <NavLink to={route} key={key}>
  //           <SidenavItem name={name} icon={icon} active={key === itemName} />
  //         </NavLink>
  //       );
  //     }
  //   } else if (type === "title") {
  //     returnValue = (
  //       <ArgonTypography
  //         key={key}
  //         color={darkSidenav ? "white" : "dark"}
  //         display="block"
  //         variant="caption"
  //         fontWeight="bold"
  //         textTransform="uppercase"
  //         opacity={0.6}
  //         pl={3}
  //         mt={2}
  //         mb={1}
  //         ml={1}
  //       >
  //         {title}
  //       </ArgonTypography>
  //     );
  //   } else if (type === "divider") {
  //     returnValue = <Divider key={key} light={darkSidenav} />;
  //   }

  //   return returnValue;
  // });

  const renderRoutes = routes.map(({ type, name, icon, title, key, href, route, collapse }) => {
    let returnValue;
    if (
      type === "route" &&
      key !== "sign-in" &&
      key !== "sign-up" &&
      key !== "error-404" &&
      key !== "error-500"
    ) {
      if (href) {
        returnValue = (
          <Link href={href} key={key} target="_blank" rel="noreferrer">
            <SidenavItem name={name} icon={icon} active={key === itemName} collapse={collapse} />

            {collapse && collapse.length > 0 && <ul>{renderRoutes(collapse)}</ul>}
          </Link>
        );
      } else {
        returnValue = (
          <NavLink to={route} key={key}>
            <SidenavItem name={name} icon={icon} active={key === itemName} />
          </NavLink>
        );
      }
    } else if (type === "collapse" && isUserLoggedIn) {
      if (href) {
        returnValue = (
          <Link href={href} key={key} target="_blank" rel="noreferrer">
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              collapse={collapse}
            />
          </Link>
        );
      } else if (
        route &&
        key !== "sign-in" &&
        key !== "sign-up" &&
        key !== "error-404" &&
        key !== "error-500"
      ) {
        returnValue = (
          <NavLink to={route} key={key}>
            <SidenavCollapse name={name} icon={icon} active={key === collapseName}>
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          </NavLink>
        );
      } else {
        returnValue = (
          <SidenavCollapse
            key={key}
            name={name}
            icon={icon}
            active={key === collapseName}
            open={openCollapse === key}
            onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
          >
            {collapse ? renderCollapse(collapse) : null}
          </SidenavCollapse>
        );
      }
    } else if (type === "title") {
      returnValue = (
        <ArgonTypography
          key={key}
          color={darkSidenav ? "white" : "dark"}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </ArgonTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} light={darkSidenav} />;
    }
    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ darkSidenav, miniSidenav, layout }}>
      <ArgonBox pt={3} pb={1} px={4} textAlign="center">
        <ArgonBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <ArgonTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <ArgonBox component="img" src={brand} alt="Argon Logo" width="2rem" mr={0.25} />
          )}
          <ArgonBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <ArgonTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={darkSidenav ? "white" : "dark"}
            >
              {brandName}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
      <Divider light={darkSidenav} />
      <List>{renderRoutes}</List>

      {/* <ArgonBox pt={1} mt="auto" mb={2} mx={2}>
        <SidenavFooter />
      </ArgonBox> */}
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
