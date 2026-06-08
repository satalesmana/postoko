import { StockBarang } from "~/server/models/StockBarang.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const res = await StockBarang.find()
      .populate("kategori", "code name")
      .populate("satuan", "code name");

    return { data: res, message: "" } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
