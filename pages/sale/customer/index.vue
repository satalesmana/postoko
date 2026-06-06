<template>
  <div class="q-ma-lg">
    <CustomeTitle icon="font_download" label="Customer" />
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
            <span class="text-bold">List of Customer</span>

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

      <ClientOnly>
        <module-sale-customer-list-data ref="tblCustomerRef" />
      </ClientOnly>

      <q-separator />
    </q-card>
  </div>
</template>

<script setup>
const tblCustomerRef = ref(null);
const router = useRouter();

const onCreateData = () => {
  router.push("/sale/customer/form-input");
};

const onLoadData = () => {
  tblCustomerRef.value.onRequest({
    pagination: { page: 1, rowsPerPage: 10 },
  });
};

const onEditItem = () => {};
const onDelete = () => {};
</script>
