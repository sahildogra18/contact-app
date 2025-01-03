import { configureStore } from "@reduxjs/toolkit";
import contactDataSlice from "../features/contactsData";

export const store = configureStore({
  reducer: {
    app: contactDataSlice,
  },
});
