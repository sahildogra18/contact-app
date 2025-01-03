import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addtoContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, phone }) => {
    const response = await axios.post(
      `https://contact-app-abb9f-default-rtdb.firebaseio.com/contacts.json`,
      {
        name: name,
        phone: phone,
      }
    );
    return response;
  }
);

const contactDataSlice = createSlice({
  name: "contact",
  initialState: { contacts: [], status: null },

  extraReducers: (builder) => {
    builder
      .addCase(addtoContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addtoContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts.push(action.payload);
      })
      .addCase(addtoContact.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default contactDataSlice.reducer;
