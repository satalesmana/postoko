import { Schema, model } from "mongoose";

export const KategoriProdukSchema = new Schema({
  code: { type: String },
  name: { type: String },
});

export const KategoriProduk = model<any>("KategoriProduk", KategoriProdukSchema);
