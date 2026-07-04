import type { PurchaseOrderState } from "./interface";

export const getFormInput = (state: PurchaseOrderState) => {
  return state.formInput;
};

export const getListPurchaseOrder = (state: PurchaseOrderState) => {
  return state.listData;
};

export const getLines = (state: PurchaseOrderState) => {
  return state.formInput.lines;
};
