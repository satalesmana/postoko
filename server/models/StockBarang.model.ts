import { Schema, model, Types } from "mongoose";
import { KategoriProduk } from "./KategoriProduk.model"
import { Satuan } from "./Satuan.model"

export const StockBarangSchema = new Schema({
  code: { type: String },
  name: { type: String },
  kategori: { type: Types.ObjectId, ref: KategoriProduk },
  merek: { type: String },
  harga_beli: { type: Number, default: 0 },
  harga_jual: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  satuan: { type: Types.ObjectId, ref: Satuan },
});

export const StockBarang = model<any>("StockBarang", StockBarangSchema);
