export interface SatuanState {
  formInput: Satuan;
  listData: Array<Satuan>;
}

export interface Satuan {
  _id?: string | null;
  code: string;
  name: string;
}
