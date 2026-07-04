<template>
  <q-form
    ref="formInputActivityRef"
    class="q-gutter-md"
    @submit="onSubmit"
    @reset="onReset"
  >
    <div class="row q-mb-sm items-center">
      <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <label class="text-bold">Vendor Code </label>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <span class="custom-input">
          <q-input
            :model-value="vendor.code"
            outlined
            dense
            hide-bottom-space
            requird
            @update:model-value="(value) => (vendor = { code: value })"
          />
        </span>
      </div>
    </div>

    <div class="row q-mb-sm items-center">
      <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <label class="text-bold">Vendor Name </label>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <span class="custom-input">
          <q-input
            :model-value="vendor.name"
            outlined
            dense
            hide-bottom-space
            requird
            @update:model-value="(value) => (vendor = { name: value })"
          />
        </span>
      </div>
    </div>

    <div class="row q-mb-sm items-center">
      <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <label class="text-bold">HP</label>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <span class="custom-input">
          <q-input
            outlined
            dense
            hide-bottom-space
            requird
            :model-value="vendor.hp"
            @update:model-value="(value) => (vendor = { hp: value })"
          />
        </span>
      </div>
    </div>

    <div class="row q-mb-sm items-center">
      <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <label class="text-bold">Phone</label>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <span class="custom-input">
          <q-input
            outlined
            dense
            hide-bottom-space
            requird
            :model-value="vendor.telpon"
            @update:model-value="(value) => (vendor = { telpon: value })"
          />
        </span>
      </div>
    </div>

    <div class="row q-mb-sm items-center">
      <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <label class="text-bold">Email </label>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <span class="custom-input">
          <q-input
            :model-value="vendor.email"
            outlined
            dense
            hide-bottom-space
            requird
            @update:model-value="(value) => (vendor = { email: value })"
          />
        </span>
      </div>
    </div>

    <div class="row q-mb-sm items-center">
      <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <label class="text-bold">Address </label>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <span class="custom-input">
          <q-input
            :model-value="vendor.alamat"
            outlined
            dense
            hide-bottom-space
            requird
            @update:model-value="(value) => (vendor = { alamat: value })"
          />
        </span>
      </div>
    </div>

    <div class="row q-mb-sm items-center">
      <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <label class="text-bold">Bank Account </label>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <span class="custom-input">
          <q-select
            v-model:model-value="vendor.bankAccount"
            option-value="value"
            option-label="label"
            option-disable="inactive"
            emit-value
            map-options
            outlined
            :options="optBankAccount"
            dense
            @update:model-value="(value) => (vendor = { bankAccount: value })"
          >
            <template v-if="!vendor.bankAccount" #selected>
              <div class="text-grey-6">Select bank account</div>
            </template>
          </q-select>
        </span>
      </div>
    </div>

    <div class="row q-mb-sm items-center">
      <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
        &nbsp;
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <div class="q-gutter-sm">
          <q-btn unelevated type="submit" color="primary" label="Submit" />
          <q-btn unelevated color="negative" label="Cancel" @click="onReset" />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
type FormMode = "add" | "edit";

const store = useStore();
const props = defineProps({
  formMode: {
    type: String as () => FormMode,
    required: true,
    default: "add",
  },
});

const optBankAccount = computed(() => store.getters["vendor/getBankAccount"]);
const vendor = computed({
  get() {
    return store.getters["vendor/getFormInput"];
  },
  set(value: any) {
    store.commit("vendor/setVendorForm", value);
  },
});

const onSubmit = () => {
  if (props.formMode === "add") {
    store.dispatch("vendor/submitData");
  } else if (props.formMode === "edit") {
    store.dispatch("vendor/updateData");
  }
};

const onReset = () => {
  store.commit("vendor/clearVendorForm");
};
</script>
