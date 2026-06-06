import { Satuan } from "~/server/models/Satuan.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    if (!body.code) throw new Error("Kode satuan wajib diisi");
    if (!body.name) throw new Error("Nama satuan wajib diisi");

    const res = await Satuan.findByIdAndUpdate(id, body, { new: true });

    return {
      data: res,
      message: "Data satuan berhasil diperbarui.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
