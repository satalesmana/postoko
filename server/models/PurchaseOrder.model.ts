import { Schema, model, Types } from "mongoose";
import { Vendor } from "./Vendor.model";
import { Produk } from "./Produk.model";
import { Satuan } from "./Satuan.model";

export const PurchaseOrderLineSchema = new Schema({
  produk: { type: Types.ObjectId, ref: Produk },
  qty: { type: Number, default: 0 },
  satuan: { type: Types.ObjectId, ref: Satuan },
  harga: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  keterangan: { type: String },
});

export const PurchaseOrderSchema = new Schema({
  no: { type: String },
  vendor: { type: Types.ObjectId, ref: Vendor },
  tanggal: { type: Date },
  discount: { type: Number, default: 0 },
  keterangan: { type: String },
  status: {
    type: String,
    enum: ["create", "requested", "accepted", "retur"],
    default: "create",
  },
  lines: [PurchaseOrderLineSchema],
});

export const PurchaseOrder = model<any>("PurchaseOrder", PurchaseOrderSchema);
