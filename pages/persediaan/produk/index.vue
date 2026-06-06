<template>
  <div class="q-ma-lg">
    <CustomeTitle icon="inventory_2" label="Master Produk" />
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
            <span class="text-bold">List of Produk</span>

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
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const columns = ref([
  { name: "code_produk", label: "CODE", field: "code_produk", align: "left" },
  { name: "name", label: "NAMA PRODUK", field: "name", align: "left" },
  {
    name: "kategori",
    label: "KATEGORI",
    field: (row) =>
      row.kategori ? `${row.kategori.code} - ${row.kategori.name}` : "-",
    align: "left",
  },
  { name: "merek", label: "MEREK", field: "merek", align: "left" },
]);

const rows = computed(() => store.getters["produk/getListProduk"]);
const selected = ref([]);

const onLoadData = () => {
  store.dispatch("produk/fetchListProduk");
};

const onCreateData = () => {
  store.commit("produk/clearProdukForm");
  router.push("/persediaan/produk/add");
};

const onEditItem = () => {
  if (selected.value.length !== 1) {
    showNotify({ name: "Edit", type: "Warning", error: "Pilih satu item untuk diedit" });
    return;
  }
  const item = selected.value[0];
  store.commit("produk/setProdukForm", {
    ...item,
    kategori: item.kategori?._id ?? item.kategori,
  });
  router.push(`/persediaan/produk/edit/${item._id}`);
};

const onDelete = () => {
  if (selected.value.length === 0) {
    showNotify({ name: "Delete", type: "Warning", error: "Pilih item yang akan dihapus" });
    return;
  }
  const ids = selected.value.map((item) => item._id);
  store.dispatch("produk/deleteData", ids).then(() => {
    selected.value = [];
  });
};

onNuxtReady(() => {
  onLoadData();
});
</script>
