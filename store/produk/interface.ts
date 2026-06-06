export interface ProdukState {
  formInput: Produk;
  listData: Array<Produk>;
}

export interface Produk {
  _id?: string | null;
  code_produk: string;
  name: string;
  kategori: string | null;
  merek: string;
}
