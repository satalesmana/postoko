export interface KategoriProdukState {
  formInput: KategoriProduk;
  listData: Array<KategoriProduk>;
}

export interface KategoriProduk {
  _id?: string | null;
  code: string;
  name: string;
}
