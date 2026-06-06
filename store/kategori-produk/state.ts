import type { KategoriProdukState } from "./interface";

export default function (): KategoriProdukState {
  return {
    formInput: {
      _id: null,
      code: "",
      name: "",
    },
    listData: [],
  };
}
