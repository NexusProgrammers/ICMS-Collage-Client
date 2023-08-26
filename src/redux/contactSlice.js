import { createSlice } from "@reduxjs/toolkit";
import { createContact } from "../service/contactService";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: null,
    contactLoading: false,
    contactError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.contactLoading = true;
        state.contactError = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contactLoading = false;
        state.contact = action.payload.contact;
        state.contactError = null;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.contactLoading = false;
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
