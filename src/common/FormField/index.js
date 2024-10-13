/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage, Field } from "formik";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonSelect from "components/ArgonSelect";

function FormField({ label, name, componentType, options, ...rest }) {
  return (
    <ArgonBox mb={1.5}>
      <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <ArgonTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </ArgonTypography>
      </ArgonBox>
      {componentType === "select" ? (
        <Field as={ArgonSelect} name={name} options={options} {...rest} />
      ) : (
        <Field as={ArgonInput} name={name} {...rest} />
      )}
      <ArgonBox mt={0.75}>
        <ArgonTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
}

// // typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  componentType: PropTypes.oneOf(["input", "select"]).isRequired,
  options: PropTypes.array,
};
FormField.defaultProps = {
  options: [],
};

export default FormField;

// /**
// =========================================================
// * Argon Dashboard 2 PRO MUI - v3.0.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
// * Copyright 2022 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // prop-type is a library for typechecking of props
// import PropTypes from "prop-types";

// // formik components
// import { ErrorMessage, Field } from "formik";

// // Argon Dashboard 2 PRO MUI components
// import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";
// import ArgonInput from "components/ArgonInput";
// import ArgonSelect from "components/ArgonSelect";

// function FormField({ label, name, componentType, options, ...rest }) {
//   return (
//     <ArgonBox mb={1.5}>
//       <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
//         <ArgonTypography
//           component="label"
//           variant="caption"
//           fontWeight="bold"
//           textTransform="capitalize"
//         >
//           {label}
//         </ArgonTypography>
//       </ArgonBox>
//       <Field name={name} {...rest}>
//         {({ field }) =>
//           componentType === "select" ? (
//             <ArgonSelect {...field} options={options} />
//           ) : (
//             <ArgonInput {...field} />
//           )
//         }
//       </Field>
//       <ArgonBox mt={0.75}>
//         <ArgonTypography component="div" variant="caption" color="error">
//           <ErrorMessage name={name} />
//         </ArgonTypography>
//       </ArgonBox>
//     </ArgonBox>
//   );
// }
// // typechecking props for FormField
// FormField.propTypes = {
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   componentType: PropTypes.oneOf(["input", "select"]).isRequired,
//   options: PropTypes.array,
// };
// FormField.defaultProps = {
//   options: [],
// };

// export default FormField;
