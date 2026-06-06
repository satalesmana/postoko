import type { SatuanState } from "./interface";

export default function (): SatuanState {
  return {
    formInput: {
      _id: null,
      code: "",
      name: "",
    },
    listData: [],
  };
}
