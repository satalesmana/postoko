import { Vendor } from "~/server/models/Vendor.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const res = await Vendor.deleteMany(body);
    if (res.deletedCount <= 0) {
      throw new Error("Something wrong please try again");
    }
    return {
      data: [],
      message: "Your data has been deleted successfully",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
