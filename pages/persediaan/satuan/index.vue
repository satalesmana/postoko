<template>
  <div class="q-ma-lg">
    <CustomeTitle icon="font_download" label="Satuan" />
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
            <span class="text-bold">List of Satuan</span>

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
        <ClientOnly fallback-tag="span" fallback="Loading component...">
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
        </ClientOnly>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const columns = ref([
  { name: "code", label: "SATUAN CODE", field: "code", align: "left" },
  { name: "name", label: "SATUAN NAME", field: "name", align: "left" },
]);

const rows = computed(() => store.getters["satuan/getListSatuan"]);
const selected = ref([]);

const onLoadData = () => {
  store.dispatch("satuan/fetchListSatuan");
};

const onCreateData = () => {
  store.commit("satuan/clearSatuanForm");
  router.push("/persediaan/satuan/add");
};

const onEditItem = () => {
  if (selected.value.length !== 1) {
    showNotify({
      name: "Edit",
      type: "Warning",
      error: "Pilih satu item untuk diedit",
    });
    return;
  }
  const item = selected.value[0];
  store.commit("satuan/setSatuanForm", item);
  router.push(`/persediaan/satuan/edit/${item._id}`);
};

const onDelete = () => {
  if (selected.value.length === 0) {
    showNotify({
      name: "Delete",
      type: "Warning",
      error: "Pilih item yang akan dihapus",
    });
    return;
  }
  const ids = selected.value.map((item) => item._id);
  store.dispatch("satuan/deleteData", ids).then(() => {
    selected.value = [];
  });
};

onNuxtReady(() => {
  onLoadData();
});
</script>
