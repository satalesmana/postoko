import type { SatuanState } from "./interface";

export const getFormInput = (state: SatuanState) => {
  return state.formInput;
};

export const getListSatuan = (state: SatuanState) => {
  return state.listData;
};
