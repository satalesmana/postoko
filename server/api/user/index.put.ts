import bcrypt from 'bcryptjs';
import { User } from '~/server/models/User.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const config = useRuntimeConfig();
  try {
    const name = body.name;
    const email = body.email;
    const password = body.password;
    const role = body.role;

    if (name === '') throw new Error('name harus di isi');
    if (role === '') throw new Error('role harus di isi');
   

    const updateData: Record<string, any> = {
      name,
      email,
      role
    }

    if(password !=''){
        const salt = bcrypt.genSaltSync(config.saltRounds);
        const passwordHas = await bcrypt.hashSync(password, salt);

        updateData.password = passwordHas;
    }

    const res = await User.findByIdAndUpdate(body._id, updateData, { new: true });
    return { data: res, message: 'user has been updated' } as ApiResponse<
      [],
      string
    >;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
