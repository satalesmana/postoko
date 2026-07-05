<template>
  <div class="q-ma-lg">
    <CustomeTitle icon="font_download" label="Vendor" />
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
              icon="autorenew"
              @click="onLoadData"
            >
              <q-tooltip> Reload </q-tooltip>
            </q-btn>

            <q-separator vertical class="q-ml-md q-mr-md" />
            <span class="text-bold">List of Vendor</span>

            <q-space />

            <div class="q-gutter-sm">
              <q-btn
                outline
                flat
                round
                color="secondary"
                size="sm"
                icon="add"
                @click="onCreateData"
              >
                <q-tooltip> Create New Item </q-tooltip>
              </q-btn>

              <q-btn
                outline
                flat
                round
                color="primary"
                size="sm"
                icon="edit"
                @click="onEditItem"
              >
                <q-tooltip> Edit item </q-tooltip>
              </q-btn>

              <q-btn
                outline
                flat
                round
                color="red"
                size="sm"
                icon="delete"
                @click="onDelete"
              >
                <q-tooltip> Delete Item </q-tooltip>
              </q-btn>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section>
        <client-only>
          <q-table
            v-model:selected="selected"
            class="my-table"
            flat
            bordered
            :rows="rows"
            :columns="columns"
            row-key="_id"
            selection="multiple"
          />
        </client-only>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const columns = ref([
  { name: "status", label: "STATUS", field: "status", align: "left" },
  {
    name: "no",
    label: "PESANAN NO",
    field: "no",
    sortable: true,
    align: "left",
  },
  {
    name: "vendorCode",
    label: "KODE VENDOR",
    field: (row) => row.vendor?.code ?? "-",
    align: "left",
  },
  {
    name: "vendorName",
    label: "NAMA VENDOR",
    field: (row) => row.vendor?.name ?? "-",
    sortable: true,
    align: "left",
  },
  { name: "discount", label: "DISCOUNT", field: "discount", align: "left" },
  {
    name: "tanggal",
    label: "PESANAN DATE",
    field: (row) =>
      row.tanggal
        ? new Date(row.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "-",
    align: "left",
  },
  {
    name: "keterangan",
    label: "KETERANGAN",
    field: "keterangan",
    align: "left",
  },
]);
const rows = computed(
  () => store.getters["purchaseOrder/getListPurchaseOrder"],
);
const selected = ref([]);
const onLoadData = () => {
  store.dispatch("purchaseOrder/fetchListPurchaseOrder");
};
const onCreateData = () => {
  store.commit("purchaseOrder/clearPurchaseOrderForm");
  store.commit("purchaseOrder/clearListPurchaseOrder");
  router.push("/purchasing/order/add");
};
const onEditItem = () => {
  if (selected.value.length === 0) {
    Notify.create({
      message: "Please select an item to edit.",
      color: "warning",
      position: "top",
    });
    return;
  }
  if (selected.value.length > 1) {
    Notify.create({
      message: "Please select only one item to edit.",
      color: "warning",
      position: "top",
    });
    return;
  }
  const selectedItem = selected.value[0];
  router.push(`/purchasing/order/edit/${selectedItem._id}`);
};
const onDelete = () => {
  if (selected.value.length === 0) {
    return;
  }

  const selectedItem = selected.value.map((item) => item.no).join(", ");
  Dialog.create({
    title: "Delete Purchase Order",
    message: `Are you sure want to delete ${selectedItem}?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await store.dispatch("purchaseOrder/deleteData", selected.value);
    onLoadData();
  });
};

onNuxtReady(() => {
  onLoadData();
});
</script>
