<template>
  <q-card-section>
    <q-table
      ref="tableRef"
      v-model:selected="selected"
      v-model:pagination="pagination"
      class="my-table"
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="_id"
      selection="multiple"
      @request="onRequest"
    >
      <template #body-cell-name="props">
        <q-td :props="props">
          <a
            class="text-link"
            href="javascript:void(0)"
            @click="onRowClick(props.row)"
          >
            {{ props.value }}
          </a>
        </q-td>
      </template>
    </q-table>
  </q-card-section>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
const tableRef = ref();
const store = useStore();
const columns = ref([
  { name: "status", label: "STATUS", field: "status" },
  { name: "code", label: "CUSTOMER CODE", field: "code", sortable: true },
  { name: "name", label: "CUSTOMER NAME", field: "name", sortable: true },
  { name: "handphone", label: "PHONE", field: "handphone" },
  { name: "email", label: "EMAIL", field: "email" },
  { name: "addres", label: "ADDRESS", field: "addres" },
]);
const rows = computed(() => store.getters["customer/getCustomerList"]);
const metaData = computed(() => store.getters["customer/getMetaCustomerList"]);
const selected = ref([]);

const pagination = ref({
  ssortBy: false,
  descending: false,
  page: metaData.value.current_page,
  rowsPerPage: metaData.value.per_page,
  rowsNumber: metaData.value.total_data,
  pagesNumber: metaData.value.total_page,
});

const onRequest = async (props: any, startPage = null) => {
  const { page, rowsPerPage } = props.pagination;

  store.commit("customer/setMetaData", {
    per_page: rowsPerPage,
    current_page: startPage ? startPage : page,
  });

  await store.dispatch("customer/getCustomerList");

  pagination.value.rowsNumber = metaData.value.total_data;
  pagination.value.page = metaData.value.current_page;
  pagination.value.pagesNumber = metaData.value.total_page;
  pagination.value.rowsPerPage = metaData.value.per_page;
};

const onRowClick = (id: any) => {};

onNuxtReady(() => {
  tableRef.value.requestServerInteraction();
});

defineExpose({
  onRequest,
});
</script>
