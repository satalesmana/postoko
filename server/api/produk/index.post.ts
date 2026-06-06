import { Produk } from "~/server/models/Produk.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.code_produk) throw new Error("Kode produk wajib diisi");
    if (!body.name) throw new Error("Nama produk wajib diisi");

    const res = await Produk.create(body);

    return {
      data: res,
      message: "Data produk berhasil disimpan.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
