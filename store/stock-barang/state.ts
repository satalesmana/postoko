import type { StockBarangState } from "./interface";

export default function (): StockBarangState {
  return {
    formInput: {
      _id: null,
      code: "",
      name: "",
      kategori: null,
      merek: "",
      harga_beli: 0,
      harga_jual: 0,
      stock: 0,
      satuan: null,
    },
    listData: [],
  };
}
