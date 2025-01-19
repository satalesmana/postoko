import { Customer } from "~/server/models/Customer.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";
import Joi from "joi";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const customerValidation = Joi.object({
      name: Joi.string().required(),
      code: Joi.allow(null),
      handphone: Joi.string().required(),
      telpone: [Joi.string().optional(), Joi.allow(null)],
      email: [Joi.string().email({ tlds: { allow: false } })],
      addres: Joi.string().required(),
    });

    const { error } = customerValidation.validate(body);
    if (error) {
      throw createError({
        statusCode: 422,
        statusMessage: error.details[0].message,
      });
    }

    const res = await Customer.create(body);

    return { data: res, message: "Customer hasbeen saved" } as ApiResponse<
      [],
      string
    >;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
