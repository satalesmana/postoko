import type { ProdukState, Produk } from "./interface";

export function setProdukForm(state: ProdukState, payload: Partial<Produk>) {
  state.formInput = { ...state.formInput, ...payload };
}

export function clearProdukForm(state: ProdukState) {
  state.formInput = {
    _id: null,
    code_produk: "",
    name: "",
    kategori: null,
    merek: "",
  };
}

export function setListProduk(state: ProdukState, payload: Array<Produk>) {
  state.listData = payload;
}

export function clearListProduk(state: ProdukState) {
  state.listData = [];
}
