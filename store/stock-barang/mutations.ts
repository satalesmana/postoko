import type { StockBarangState, StockBarang } from "./interface";

export function setStockBarangForm(state: StockBarangState, payload: Partial<StockBarang>) {
  state.formInput = { ...state.formInput, ...payload };
}

export function clearStockBarangForm(state: StockBarangState) {
  state.formInput = {
    _id: null,
    code: "",
    name: "",
    kategori: null,
    merek: "",
    harga_beli: 0,
    harga_jual: 0,
    stock: 0,
    satuan: null,
  };
}

export function setListStockBarang(state: StockBarangState, payload: Array<StockBarang>) {
  state.listData = payload;
}

export function clearListStockBarang(state: StockBarangState) {
  state.listData = [];
}
