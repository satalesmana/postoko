import { Schema, model } from "mongoose";

export const CustomerSchema = new Schema({
  code: { type: String },
  name: { type: String },
  handphone: { type: String },
  telpone: { type: String },
  email: { type: String },
  addres: { type: String },
});

export const Customer = model<any>("Customer", CustomerSchema);
