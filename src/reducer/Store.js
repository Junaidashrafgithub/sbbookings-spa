import { legacy_createStore as createStore } from "redux";
import reducer from "./index";

const store = createStore(reducer);

export default store;
