<template>
  <div>
    <div class="bg-primary text-white q-pa-sm q-mb-md text-bold">Header</div>

    <div class="row q-col-gutter-md">
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <label class="text-bold">Pesanan NO</label>
        <span class="custom-input">
          <q-input v-model="formNo" outlined dense hide-bottom-space />
        </span>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <label class="text-bold">Kode Vendor</label>
        <span class="custom-input">
          <q-select
            v-model="formVendor"
            outlined
            dense
            hide-bottom-space
            emit-value
            map-options
            option-value="_id"
            option-label="name"
            :options="vendorOptions"
            :rules="[(v) => !!v || 'Vendor wajib dipilih']"
          >
            <template v-if="!formVendor" #selected>
              <div class="text-grey-6">- Pilih Vendor -</div>
            </template>
          </q-select>
        </span>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <label class="text-bold">Pesanan Date</label>
        <span class="custom-input">
          <q-input
            v-model="formTanggal"
            outlined
            dense
            hide-bottom-space
            type="date"
          />
        </span>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <label class="text-bold">Name Vendor</label>
        <span class="custom-input">
          <q-input
            :model-value="vendorName"
            outlined
            dense
            hide-bottom-space
            readonly
          />
        </span>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <label class="text-bold">Status</label>
        <span class="custom-input">
          <q-select
            v-model="formStatus"
            outlined
            dense
            hide-bottom-space
            emit-value
            map-options
            option-value="value"
            option-label="label"
            :options="statusOptions"
          />
        </span>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <label class="text-bold">Discount</label>
        <span class="custom-input">
          <q-input
            v-model.number="formDiscount"
            outlined
            dense
            hide-bottom-space
            type="number"
          />
        </span>
      </div>

      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <label class="text-bold">Keterangan</label>
        <span class="custom-input">
          <q-input
            v-model="formKeterangan"
            outlined
            dense
            hide-bottom-space
            type="textarea"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

const formInput = computed(() => store.getters["purchaseOrder/getFormInput"]);

const formNo = computed({
  get: () => formInput.value.no,
  set: (val: string) =>
    store.commit("purchaseOrder/setPurchaseOrderForm", { no: val }),
});

const formVendor = computed({
  get: () => formInput.value.vendor,
  set: (val: string) =>
    store.commit("purchaseOrder/setPurchaseOrderForm", { vendor: val }),
});

const formTanggal = computed({
  get: () => formInput.value.tanggal,
  set: (val: string) =>
    store.commit("purchaseOrder/setPurchaseOrderForm", { tanggal: val }),
});

const formStatus = computed({
  get: () => formInput.value.status,
  set: (val: string) =>
    store.commit("purchaseOrder/setPurchaseOrderForm", { status: val }),
});

const formDiscount = computed({
  get: () => formInput.value.discount,
  set: (val: number) =>
    store.commit("purchaseOrder/setPurchaseOrderForm", { discount: val }),
});

const formKeterangan = computed({
  get: () => formInput.value.keterangan,
  set: (val: string) =>
    store.commit("purchaseOrder/setPurchaseOrderForm", { keterangan: val }),
});

const vendorOptions = computed(() =>
  store.getters["vendor/getListVendor"].map((v: any) => ({
    name: `${v.code} - ${v.name}`,
    _id: v._id,
  })),
);

const vendorName = computed(() => {
  const vendor = store.getters["vendor/getListVendor"].find(
    (v: any) => v._id === formVendor.value,
  );
  return vendor?.name ?? "";
});

const statusOptions = ref([
  { label: "Create", value: "create" },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "Retur", value: "retur" },
]);

onNuxtReady(() => {
  store.dispatch("vendor/fetchListVendor");
});
</script>
