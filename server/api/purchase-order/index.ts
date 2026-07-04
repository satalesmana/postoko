import { PurchaseOrder } from "~/server/models/PurchaseOrder.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const res = await PurchaseOrder.find()
      .populate("vendor", "code name")
      .populate("lines.produk", "code_produk name kategori")
      .populate("lines.satuan", "code name");

    return { data: res, message: "" } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
