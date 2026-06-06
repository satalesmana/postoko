import { Satuan } from "~/server/models/Satuan.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const res = await Satuan.deleteMany({ _id: { $in: body.ids } });
    if (res.deletedCount <= 0) {
      throw new Error("Gagal menghapus data, silakan coba lagi");
    }

    return {
      data: [],
      message: "Data satuan berhasil dihapus.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
