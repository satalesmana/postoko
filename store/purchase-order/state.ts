import type { PurchaseOrderState } from "./interface";

export default function (): PurchaseOrderState {
  return {
    formInput: {
      _id: null,
      no: "",
      vendor: null,
      tanggal: null,
      discount: 0,
      keterangan: "",
      status: "create",
      lines: [],
    },
    listData: [],
  };
}
