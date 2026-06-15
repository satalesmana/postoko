import type { Nitro } from 'nitropack';
import mongoose from 'mongoose';

// Register all Mongoose models before using populate()
import '~/server/models/Activity.model';
import '~/server/models/Customer.model';
import '~/server/models/KategoriProduk.model';
import '~/server/models/Produk.model';
import '~/server/models/Satuan.model';
import '~/server/models/StockBarang.model';
import '~/server/models/User.model';
import '~/server/models/UserActivity.model';
import '~/server/models/Vendor.model';

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
};
