import { Schema, model } from "mongoose";

export const StockBarangSchema = new Schema({
  code: { type: String },
  name: { type: String },
  kategori: { type: Schema.Types.ObjectId, ref: "KategoriProduk" },
  merek: { type: String },
  harga_beli: { type: Number, default: 0 },
  harga_jual: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  satuan: { type: Schema.Types.ObjectId, ref: "Satuan" },
});

export const StockBarang = model<any>("StockBarang", StockBarangSchema);
