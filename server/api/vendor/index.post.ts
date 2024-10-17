import { Vendor } from "~/server/models/Vendor.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (body.code === "") throw new Error("Code is required");
    if (body.name === "") throw new Error("Name is required");
    if (body.email === "") throw new Error("Email is required");
    if (body.bankAccount === "") throw new Error("Bank Account is required");

    const res = await Vendor.create(body);

    return {
      data: res,
      message: "Your data has been created successfully.",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
