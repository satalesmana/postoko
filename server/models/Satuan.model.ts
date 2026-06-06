import { Schema, model } from "mongoose";

export const SatuanSchema = new Schema({
  code: { type: String },
  name: { type: String },
});

export const Satuan = model<any>("Satuan", SatuanSchema);
