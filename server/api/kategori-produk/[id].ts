import { KategoriProduk } from "~/server/models/KategoriProduk.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    const res = await KategoriProduk.find({ _id: id });

    return { data: res, message: "" } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
