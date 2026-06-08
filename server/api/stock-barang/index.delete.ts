import { StockBarang } from "~/server/models/StockBarang.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const res = await StockBarang.deleteMany({ _id: { $in: body.ids } });
    if (res.deletedCount <= 0) {
      throw new Error("Gagal menghapus data, silakan coba lagi");
    }

    return {
      data: [],
      message: "Data stok barang berhasil dihapus.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
