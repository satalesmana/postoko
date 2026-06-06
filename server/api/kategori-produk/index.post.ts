import { KategoriProduk } from "~/server/models/KategoriProduk.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.code) throw new Error("Kode kategori wajib diisi");
    if (!body.name) throw new Error("Nama kategori wajib diisi");

    const res = await KategoriProduk.create(body);

    return {
      data: res,
      message: "Data kategori produk berhasil disimpan.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
