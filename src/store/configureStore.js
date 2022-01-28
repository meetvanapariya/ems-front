import { configureStore } from "@reduxjs/toolkit";
import { appAPi } from "../RTK-Query/appApi";
import { userReducer, commonReducer } from "./reducers";

export default configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
    [appAPi.reducerPath]: appAPi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appAPi.middleware),
});
