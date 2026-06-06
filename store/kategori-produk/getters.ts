import type { KategoriProdukState } from "./interface";

export const getFormInput = (state: KategoriProdukState) => {
  return state.formInput;
};

export const getListKategoriProduk = (state: KategoriProdukState) => {
  return state.listData;
};
