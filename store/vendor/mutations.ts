import type { VendorState, Vendor } from "./interface";

export function setVendorForm(state: VendorState, payload: Vendor) {
  state.formInput = { ...state.formInput, ...payload };
}

export function clearVendorForm(state: VendorState) {
  state.formInput = {
    alamat: "",
    bankAccount: "",
    code: "",
    email: "",
    hp: "",
    name: "",
    telpon: "",
  };
}

export function setListVendor(state: VendorState, payload: Array<Vendor>) {
  state.listData = payload;
}

export function clearListVendor(state: VendorState) {
  state.listData = [];
}
