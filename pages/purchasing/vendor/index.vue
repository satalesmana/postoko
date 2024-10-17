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
        <q-table
          v-model:selected="selected"
          class="my-table"
          flat
          bordered
          :rows="rows"
          :columns="columns"
          row-key="_id"
          selection="multiple"
        >
          <template #body-cell-telpon="props">
            <q-td :props="props">
              <span v-if="props.row.telpon != ''" style="display: block">
                Telpon: {{ props.row.telpon }}
              </span>
              <span v-if="props.row.hp != ''" style="display: block">
                HP: {{ props.row.hp }}
              </span>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const columns = ref([
  { name: "code", label: "VENDOR CODE", field: "code" },
  { name: "email", label: "VENDOR NAME", field: "email" },
  { name: "telpon", label: "PHONE", field: "telpon" },
  { name: "email", label: "EMAIL", field: "email" },
  { name: "alamat", label: "ADDRESS", field: "alamat" },
]);
const rows = computed(() => store.getters["vendor/getListVendor"]);

const selected = ref([]);

const onLoadData = () => {
  store.dispatch("vendor/fetchListVendor");
};

const onCreateData = () => {
  store.commit("vendor/clearVendorForm");
  router.push("/purchasing/vendor/form-input");
};
const onEditItem = () => {};
const onDelete = () => {};

onNuxtReady(() => {
  onLoadData();
});
</script>
