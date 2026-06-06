import type { SatuanState, Satuan } from "./interface";

export function setSatuanForm(state: SatuanState, payload: Satuan) {
  state.formInput = { ...state.formInput, ...payload };
}

export function clearSatuanForm(state: SatuanState) {
  state.formInput = {
    _id: null,
    code: "",
    name: "",
  };
}

export function setListSatuan(state: SatuanState, payload: Array<Satuan>) {
  state.listData = payload;
}

export function clearListSatuan(state: SatuanState) {
  state.listData = [];
}
