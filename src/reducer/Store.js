// store.js
import { legacy_createStore as createStore } from "redux";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./index"; // Import persistedReducer from reducers/index.js

// Create the Redux store with persisted reducer
export const store = createStore(persistedReducer);

// Create the persistor to be used by PersistGate
export const persistor = persistStore(store);

/* import { legacy_createStore as createStore } from "redux";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./index";

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default { store, persistor }; */
