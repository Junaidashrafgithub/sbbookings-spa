// Argon Dashboard 2 MUI layouts
import Dashboard from "../containers/dashboard/index";
import Tables from "layouts/tables";
import Profile from "../containers/profile/index";
import SignIn from "../containers/authentication/Sign-in/index";
import SignUp from "../containers/authentication/Sign-up/index";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import Staff from "../containers/Staff/Users/index";
import Customer from "../containers/customer/index";
import Reports from "../containers/reports/index";
import Services from "containers/services";

const AdminRoutes = [
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
    ),
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Staff Managment",
    key: "staff_managment",
    route: "/staff_managment",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: <Staff />,
  },
  {
    type: "route",
    name: "Customer Managment",
    key: "customer_managment",
    route: "/customer_managment",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: <Customer />,
  },
  /* {
    type: "route",
    name: "Add Doctor",
    key: "add-doctor",
    route: "/authentication/sign-up",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-collection" />,
    component: <SignUp />,
  }, */
  {
    type: "route",
    name: "Services",
    key: "services",
    route: "/services",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
    ),
    component: <Services />,
  },
  {
    type: "route",
    name: "Reports",
    key: "reports",
    route: "/reports",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
    ),
    component: <Reports />,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
    component: <Profile />,
  },
];

export default AdminRoutes;
