export type PurchaseOrderStatus = "create" | "requested" | "accepted" | "retur";

export interface PurchaseOrderLine {
  produk: string | null;
  satuan: string | null;
  qty: number;
  harga: number;
  discount: number;
  total: number;
  keterangan: string;
}

export interface PurchaseOrder {
  _id?: string | null;
  no: string;
  vendor: string | null;
  tanggal: string | null;
  discount: number;
  keterangan: string;
  status: PurchaseOrderStatus;
  lines: Array<PurchaseOrderLine>;
}

export interface PurchaseOrderState {
  formInput: PurchaseOrder;
  listData: Array<PurchaseOrder>;
}
