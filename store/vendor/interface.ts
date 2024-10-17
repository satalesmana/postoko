export interface VendorState {
  formInput: Vendor;
  listData: Array<Vendor>;
  optBankAccount: Array<BankAccount>;
}

export interface BankAccount {
  label: string;
  value: string;
}
export interface Vendor {
  code: string;
  name: string;
  hp: string;
  telpon: string;
  email: string;
  alamat: string;
  bankAccount: string;
}
