import { Customer } from "~/server/models/Customer.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const res = await getQuery(Customer, {});

    return {
      data: res.data,
      meta: {
        total: res.total,
        per_page: res.per_page,
      },
      message: "",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
