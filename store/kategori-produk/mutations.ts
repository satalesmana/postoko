import type { KategoriProdukState, KategoriProduk } from "./interface";

export function setKategoriProdukForm(
  state: KategoriProdukState,
  payload: KategoriProduk
) {
  state.formInput = { ...state.formInput, ...payload };
}

export function clearKategoriProdukForm(state: KategoriProdukState) {
  state.formInput = {
    _id: null,
    code: "",
    name: "",
  };
}

export function setListKategoriProduk(
  state: KategoriProdukState,
  payload: Array<KategoriProduk>
) {
  state.listData = payload;
}

export function clearListKategoriProduk(state: KategoriProdukState) {
  state.listData = [];
}
