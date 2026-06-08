import { StockBarang } from "~/server/models/StockBarang.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    const res = await StockBarang.find({ _id: id })
      .populate("kategori", "code name")
      .populate("satuan", "code name");

    return { data: res, message: "" } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
