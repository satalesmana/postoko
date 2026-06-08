<template>
  <div class="q-ma-lg">
    <CustomeTitle
      icon="inventory"
      :label="isEdit ? 'Edit Stok Barang' : 'Add New Stok Barang'"
    />
    <q-card flat bordered class="q-mt-lg">
      <q-item class="bg-grey-4">
        <q-item-section>
          <q-item-label class="row no-wrap items-center">
            <q-btn
              outline
              flat
              round
              color="primary"
              size="sm"
              icon="arrow_back"
              @click="onBack"
            >
              <q-tooltip> Back </q-tooltip>
            </q-btn>

            <q-separator vertical class="q-ml-md q-mr-md" />

            <span class="text-bold">{{
              isEdit ? "Edit Stok Barang" : "Stok Barang Form"
            }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section>
        <ClientOnly fallback-tag="span" fallback="Loading component...">
          <q-form
            ref="formRef"
            class="q-gutter-md"
            @submit="onSubmit"
            @reset="onReset"
          >
            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold"
                  >Code <span class="text-red">*</span></label
                >
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model="formCode"
                    outlined
                    dense
                    hide-bottom-space
                    :rules="[(v) => !!v || 'Kode stok barang wajib diisi']"
                    placeholder="Contoh: STK-001"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold"
                  >Name <span class="text-red">*</span></label
                >
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model="formName"
                    outlined
                    dense
                    hide-bottom-space
                    :rules="[(v) => !!v || 'Nama stok barang wajib diisi']"
                    placeholder="Nama barang"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold"
                  >Kategori <span class="text-red">*</span></label
                >
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-select
                    v-model="formKategori"
                    outlined
                    dense
                    hide-bottom-space
                    :options="kategoriOptions"
                    emit-value
                    map-options
                    option-value="value"
                    option-label="label"
                    :rules="[(v) => !!v || 'Kategori wajib dipilih']"
                    placeholder="Pilih kategori"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Merek</label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model="formMerek"
                    outlined
                    dense
                    hide-bottom-space
                    placeholder="Merek barang"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">
                  Satuan
                  <span class="text-red">*</span></label
                >
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-select
                    v-model="formSatuan"
                    outlined
                    dense
                    hide-bottom-space
                    :options="satuanOptions"
                    emit-value
                    map-options
                    option-value="value"
                    option-label="label"
                    :rules="[(v) => !!v || 'Satuan wajib dipilih']"
                    placeholder="Pilih satuan"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Harga Beli</label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model.number="formHargaBeli"
                    outlined
                    dense
                    hide-bottom-space
                    type="number"
                    min="0"
                    placeholder="0"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Harga Jual</label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model.number="formHargaJual"
                    outlined
                    dense
                    hide-bottom-space
                    type="number"
                    min="0"
                    placeholder="0"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Stock</label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model.number="formStock"
                    outlined
                    dense
                    hide-bottom-space
                    type="number"
                    min="0"
                    placeholder="0"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                &nbsp;
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <div class="q-gutter-sm">
                  <q-btn
                    unelevated
                    type="submit"
                    color="primary"
                    label="Submit"
                  />
                  <q-btn
                    unelevated
                    color="negative"
                    label="Cancel"
                    @click="onBack"
                  />
                </div>
              </div>
            </div>
          </q-form>
        </ClientOnly>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const route = useRoute();
const store = useStore();
const formRef = ref<{ resetValidation: () => void } | null>(null);

const formCode = computed({
  get: () => store.getters["stockBarang/getFormInput"].code,
  set: (val: string) =>
    store.commit("stockBarang/setStockBarangForm", { code: val }),
});

const formName = computed({
  get: () => store.getters["stockBarang/getFormInput"].name,
  set: (val: string) =>
    store.commit("stockBarang/setStockBarangForm", { name: val }),
});

const formKategori = computed({
  get: () => store.getters["stockBarang/getFormInput"].kategori,
  set: (val: string) =>
    store.commit("stockBarang/setStockBarangForm", { kategori: val }),
});

const formMerek = computed({
  get: () => store.getters["stockBarang/getFormInput"].merek,
  set: (val: string) =>
    store.commit("stockBarang/setStockBarangForm", { merek: val }),
});

const formSatuan = computed({
  get: () => store.getters["stockBarang/getFormInput"].satuan,
  set: (val: string) =>
    store.commit("stockBarang/setStockBarangForm", { satuan: val }),
});

const formHargaBeli = computed({
  get: () => store.getters["stockBarang/getFormInput"].harga_beli,
  set: (val: number) =>
    store.commit("stockBarang/setStockBarangForm", { harga_beli: val }),
});

const formHargaJual = computed({
  get: () => store.getters["stockBarang/getFormInput"].harga_jual,
  set: (val: number) =>
    store.commit("stockBarang/setStockBarangForm", { harga_jual: val }),
});

const formStock = computed({
  get: () => store.getters["stockBarang/getFormInput"].stock,
  set: (val: number) =>
    store.commit("stockBarang/setStockBarangForm", { stock: val }),
});

const kategoriOptions = computed(() =>
  store.getters["kategoriProduk/getListKategoriProduk"].map((k: any) => ({
    label: `${k.code} - ${k.name}`,
    value: k._id,
  })),
);

const satuanOptions = computed(() =>
  store.getters["satuan/getListSatuan"].map((s: any) => ({
    label: `${s.code} - ${s.name}`,
    value: s._id,
  })),
);

const onBack = () => {
  router.push("/persediaan/stock-barang");
};

const onSubmit = () => {
  if (props.isEdit) {
    store.dispatch("stockBarang/updateData");
  } else {
    store.dispatch("stockBarang/submitData");
  }
};

const onReset = () => {
  store.commit("stockBarang/clearStockBarangForm");
  formRef.value?.resetValidation();
};

onNuxtReady(() => {
  store.dispatch("kategoriProduk/fetchListKategoriProduk");
  store.dispatch("satuan/fetchListSatuan");
  if (props.isEdit && route.params.id) {
    store.dispatch("stockBarang/fetchStockBarangById", route.params.id);
  }
});
</script>
