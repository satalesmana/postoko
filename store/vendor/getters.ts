import type { VendorState } from "./interface";

export const getFormInput = (state: VendorState) => {
  return state.formInput;
};

export const getListVendor = (state: VendorState) => {
  return state.listData;
};

export const getBankAccount = (state: VendorState) => {
  return state.optBankAccount;
};
