import { Schema, model } from "mongoose";

export const VendorSchema = new Schema({
  code: { type: String },
  name: { type: String },
  hp: { type: String },
  telpon: { type: String },
  email: { type: String },
  alamat: { type: String },
  bankAccount: { type: String },
});

export const Vendor = model<any>("Vendor", VendorSchema);
