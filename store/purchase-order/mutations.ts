import type {
  PurchaseOrderState,
  PurchaseOrder,
  PurchaseOrderLine,
} from "./interface";

export function setPurchaseOrderForm(
  state: PurchaseOrderState,
  payload: Partial<PurchaseOrder>
) {
  state.formInput = { ...state.formInput, ...payload };
}

export function clearPurchaseOrderForm(state: PurchaseOrderState) {
  state.formInput = {
    _id: null,
    no: "",
    vendor: null,
    tanggal: null,
    discount: 0,
    keterangan: "",
    status: "create",
    lines: [],
  };
}

export function setListPurchaseOrder(
  state: PurchaseOrderState,
  payload: Array<PurchaseOrder>
) {
  state.listData = payload;
}

export function clearListPurchaseOrder(state: PurchaseOrderState) {
  state.listData = [];
}

export function addLine(state: PurchaseOrderState) {
  state.formInput.lines.push({
    produk: null,
    satuan: null,
    qty: 0,
    harga: 0,
    discount: 0,
    total: 0,
    keterangan: "",
  });
}

export function updateLine(
  state: PurchaseOrderState,
  { index, payload }: { index: number; payload: Partial<PurchaseOrderLine> }
) {
  const line = { ...state.formInput.lines[index], ...payload };
  line.total = line.qty * line.harga - line.discount;
  state.formInput.lines.splice(index, 1, line);
}

export function removeLine(state: PurchaseOrderState, index: number) {
  state.formInput.lines.splice(index, 1);
}
