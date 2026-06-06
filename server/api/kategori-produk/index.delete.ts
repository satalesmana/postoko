import { KategoriProduk } from "~/server/models/KategoriProduk.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const res = await KategoriProduk.deleteMany({ _id: { $in: body.ids } });
    if (res.deletedCount <= 0) {
      throw new Error("Gagal menghapus data, silakan coba lagi");
    }

    return {
      data: [],
      message: "Data kategori produk berhasil dihapus.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
