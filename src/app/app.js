import { configureStore } from "@reduxjs/toolkit";
import { addtoContact } from "../features/contactsData";

export const store = configureStore({
  reducer: {
    app: addtoContact,
  },
});
