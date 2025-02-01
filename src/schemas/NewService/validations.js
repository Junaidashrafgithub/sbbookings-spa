import * as Yup from "yup";
import serviceCheckout from "schemas/NewService/form";

const {
  formField: { name },
} = serviceCheckout;

const validations = [
  Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
  }),
];

export default validations;
