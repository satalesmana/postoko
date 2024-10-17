import type { VendorState } from "./interface";

export default function (): VendorState {
  return {
    formInput: {
      alamat: "",
      bankAccount: "",
      code: "",
      email: "",
      hp: "",
      name: "",
      telpon: "",
    },
    listData: [],
    optBankAccount: [
      { label: "Bank Central Asia", value: "BCA" },
      { label: "Bank Rakyat Indonesia", value: "BRI" },
    ],
  };
}
