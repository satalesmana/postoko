import { Schema, model } from "mongoose";

export const ProdukSchema = new Schema({
  code_produk: { type: String },
  name: { type: String },
  kategori: { type: Schema.Types.ObjectId, ref: "KategoriProduk" },
  merek: { type: String },
});

export const Produk = model<any>("Produk", ProdukSchema);
