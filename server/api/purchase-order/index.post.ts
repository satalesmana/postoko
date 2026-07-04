import { PurchaseOrder } from "~/server/models/PurchaseOrder.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.no) throw new Error("No pesanan wajib diisi");
    if (!body.vendor) throw new Error("Kode vendor wajib diisi");

    const res = await PurchaseOrder.create(body);

    return {
      data: res,
      message: "Data pesanan berhasil disimpan.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
