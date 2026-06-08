import { StockBarang } from "~/server/models/StockBarang.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.code) throw new Error("Kode stok barang wajib diisi");
    if (!body.name) throw new Error("Nama stok barang wajib diisi");

    const res = await StockBarang.create(body);

    return {
      data: res,
      message: "Data stok barang berhasil disimpan.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
