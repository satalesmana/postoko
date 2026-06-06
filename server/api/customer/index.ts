import { Customer } from "~/server/models/Customer.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const per_page = query?.per_page || 0;
    const current_page = query?.current_page || 0;

    const filterQuery = {
      filter: query?.filter || null,
      limit: query.per_page,
      skiped: parseInt(per_page) * (parseInt(current_page) - 1),
    };

    console.log("filterQuery", filterQuery);
    const { data, meta } = await getQueryMongodb(Customer, filterQuery);

    return {
      data,
      meta,
      message: "",
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
