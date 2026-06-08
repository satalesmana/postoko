export interface StockBarangState {
  formInput: StockBarang;
  listData: Array<StockBarang>;
}

export interface StockBarang {
  _id?: string | null;
  code: string;
  name: string;
  kategori: string | null;
  merek: string;
  harga_beli: number;
  harga_jual: number;
  stock: number;
  satuan: string | null;
}
