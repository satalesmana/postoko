import type { ProdukState } from "./interface";

export default function (): ProdukState {
  return {
    formInput: {
      _id: null,
      code_produk: "",
      name: "",
      kategori: null,
      merek: "",
    },
    listData: [],
  };
}
