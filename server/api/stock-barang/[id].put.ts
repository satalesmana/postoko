import { StockBarang } from "~/server/models/StockBarang.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    if (!body.code) throw new Error("Kode stok barang wajib diisi");
    if (!body.name) throw new Error("Nama stok barang wajib diisi");

    const res = await StockBarang.findByIdAndUpdate(id, body, { new: true });

    return {
      data: res,
      message: "Data stok barang berhasil diperbarui.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
