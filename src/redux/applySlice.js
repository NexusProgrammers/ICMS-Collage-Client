import { createSlice } from "@reduxjs/toolkit";
import {
  apply,
  updateApply,
  getApplies,
  getApply,
  deleteApply,
  getAcceptedApplies,
  getRejectedApplies,
  getTotalApplies,
  getNewApplies,
  getViewedApplies,
} from "../service/applyService";
import {
  acceptApply,
  downloadPDF,
  rejectApply,
  viewApply,
} from "../service/adminService";

const initialState = {
  applies: [],
  apply: null,
  applyFormLoading: false,
  applyFormError: null,
  updateApplyLoading: false,
  updateApplyError: null,
  getAppliesLoading: false,
  getAppliesError: null,
  getApplyLoading: false,
  getApplyError: null,
  viewApplyLoading: false,
  viewApplyError: null,
  deleteApplyLoading: false,
  deleteApplyError: null,
  acceptedApplyLoading: false,
  acceptedApplyError: null,
  rejectedApplyLoading: false,
  rejectedApplyError: null,
  downloadPDFLoading: false,
  downloadPDFError: null,
  getAcceptedAppliesLoading: false,
  getAcceptedAppliesError: null,
  getRejectedAppliesLoading: false,
  getRejectedAppliesError: null,
  getTotalAppliesLoading: false,
  getTotalAppliesError: null,
  getNewAppliesLoading: false,
  getNewAppliesError: null,
  getViewedAppliesLoading: false,
  getViewedAppliesError: null,
};

const applySlice = createSlice({
  name: "apply",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apply.pending, (state) => {
        state.applyFormLoading = true;
        state.applyFormError = null;
      })
      .addCase(apply.fulfilled, (state, action) => {
        state.applyFormLoading = false;
        state.applyFormError = null;
        state.apply = action.payload.apply;
      })
      .addCase(apply.rejected, (state, action) => {
        state.applyFormLoading = false;
        state.applyFormError = action.error.message;
      })
      .addCase(updateApply.pending, (state) => {
        state.updateApplyLoading = true;
        state.updateApplyError = null;
      })
      .addCase(updateApply.fulfilled, (state, action) => {
        state.updateApplyLoading = false;
        state.updateApplyError = null;
        state.apply = action.payload.apply;
      })
      .addCase(updateApply.rejected, (state, action) => {
        state.updateApplyLoading = false;
        state.updateApplyError = action.error.message;
      })
      .addCase(getApplies.pending, (state) => {
        state.getAppliesLoading = true;
        state.getAppliesError = null;
      })
      .addCase(getApplies.fulfilled, (state, action) => {
        state.getAppliesLoading = false;
        state.getAppliesError = null;
        state.applies = action.payload.applies;
      })
      .addCase(getApplies.rejected, (state, action) => {
        state.getAppliesLoading = false;
        state.getAppliesError = action.error.message;
      })
      .addCase(getApply.pending, (state) => {
        state.getApplyLoading = true;
        state.getApplyError = null;
      })
      .addCase(getApply.fulfilled, (state, action) => {
        state.getApplyLoading = false;
        state.getApplyError = null;
        state.apply = action.payload.apply;
      })
      .addCase(getApply.rejected, (state, action) => {
        state.getApplyLoading = false;
        state.getApplyError = action.error.message;
      })
      .addCase(viewApply.pending, (state) => {
        state.viewApplyLoading = true;
        state.viewApplyError = null;
      })
      .addCase(viewApply.fulfilled, (state, action) => {
        state.viewApplyLoading = false;
        state.viewApplyError = null;
        state.apply = action.payload.apply;
      })
      .addCase(viewApply.rejected, (state, action) => {
        state.viewApplyLoading = false;
        state.viewApplyError = action.error.message;
      })
      .addCase(deleteApply.pending, (state) => {
        state.deleteApplyLoading = true;
        state.deleteApplyError = null;
      })
      .addCase(deleteApply.fulfilled, (state, action) => {
        state.deleteApplyLoading = false;
        state.deleteApplyError = null;
        state.apply = action.payload.apply;
      })
      .addCase(deleteApply.rejected, (state, action) => {
        state.deleteApplyLoading = false;
        state.deleteApplyError = action.error.message;
      })
      .addCase(acceptApply.pending, (state) => {
        state.acceptedApplyLoading = true;
        state.acceptedApplyError = null;
      })
      .addCase(acceptApply.fulfilled, (state, action) => {
        state.acceptedApplyLoading = false;
        state.acceptedApplyError = null;
        state.apply = action.payload.apply;
      })
      .addCase(acceptApply.rejected, (state, action) => {
        state.acceptedApplyLoading = false;
        state.acceptedApplyError = action.error.message;
      })
      .addCase(rejectApply.pending, (state) => {
        state.rejectedApplyLoading = true;
        state.rejectedApplyError = null;
      })
      .addCase(rejectApply.fulfilled, (state, action) => {
        state.rejectedApplyLoading = false;
        state.rejectedApplyError = null;
        state.apply = action.payload.apply;
      })
      .addCase(rejectApply.rejected, (state, action) => {
        state.rejectedApplyLoading = false;
        state.rejectedApplyError = action.error.message;
      })
      .addCase(downloadPDF.pending, (state) => {
        state.downloadPDFLoading = true;
        state.downloadPDFError = null;
      })
      .addCase(downloadPDF.fulfilled, (state, action) => {
        state.downloadPDFLoading = false;
        state.downloadPDFError = null;
        state.apply = action.payload.apply;
      })
      .addCase(downloadPDF.rejected, (state, action) => {
        state.downloadPDFLoading = false;
        state.downloadPDFError = action.error.message;
      })
      .addCase(getAcceptedApplies.pending, (state) => {
        state.getAcceptedAppliesLoading = true;
        state.getAcceptedAppliesError = null;
      })
      .addCase(getAcceptedApplies.fulfilled, (state, action) => {
        state.getAcceptedAppliesLoading = false;
        state.getAcceptedAppliesError = null;
        state.applies = action.payload.applies;
      })
      .addCase(getAcceptedApplies.rejected, (state, action) => {
        state.getAcceptedAppliesLoading = false;
        state.getAcceptedAppliesError = action.error.message;
      })
      .addCase(getRejectedApplies.pending, (state) => {
        state.getRejectedAppliesLoading = true;
        state.getRejectedAppliesError = null;
      })
      .addCase(getRejectedApplies.fulfilled, (state, action) => {
        state.getRejectedAppliesLoading = false;
        state.getRejectedAppliesError = null;
        state.applies = action.payload.applies;
      })
      .addCase(getRejectedApplies.rejected, (state, action) => {
        state.getRejectedAppliesLoading = false;
        state.getRejectedAppliesError = action.error.message;
      })
      .addCase(getTotalApplies.pending, (state) => {
        state.getTotalAppliesLoading = true;
        state.getTotalAppliesError = null;
      })
      .addCase(getTotalApplies.fulfilled, (state, action) => {
        state.getTotalAppliesLoading = false;
        state.getTotalAppliesError = null;
        state.applies = action.payload.applies;
      })
      .addCase(getTotalApplies.rejected, (state, action) => {
        state.getTotalAppliesLoading = false;
        state.getTotalAppliesError = action.error.message;
      })
      .addCase(getNewApplies.pending, (state) => {
        state.getNewAppliesLoading = true;
        state.getNewAppliesError = null;
      })
      .addCase(getNewApplies.fulfilled, (state, action) => {
        state.getNewAppliesLoading = false;
        state.getNewAppliesError = null;
        state.applies = action.payload.applies;
      })
      .addCase(getNewApplies.rejected, (state, action) => {
        state.getNewAppliesLoading = false;
        state.getNewAppliesError = action.error.message;
      })
      .addCase(getViewedApplies.pending, (state) => {
        state.getViewedAppliesLoading = true;
        state.getViewedAppliesError = null;
      })
      .addCase(getViewedApplies.fulfilled, (state, action) => {
        state.getViewedAppliesLoading = false;
        state.getViewedAppliesError = null;
        state.applies = action.payload.applies;
      })
      .addCase(getViewedApplies.rejected, (state, action) => {
        state.getViewedAppliesLoading = false;
        state.getViewedAppliesError = action.error.message;
      });
  },
});

export default applySlice.reducer;
