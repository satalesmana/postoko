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
              icon="arrow_back"
              @click="onBack"
            >
              <q-tooltip> Back </q-tooltip>
            </q-btn>

            <q-separator vertical class="q-ml-md q-mr-md" />

            <span class="text-bold">Customer Form</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section>
        <ClientOnly fallback-tag="span" fallback="Loading component...">
          <q-form
            ref="formInputActivityRef"
            class="q-gutter-md"
            @submit="onSubmit"
            @reset="onReset"
          >
            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Customer Code </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    :model-value="customer.code"
                    outlined
                    dense
                    hide-bottom-space
                    requird
                    @update:model-value="(val) => (customer = { code: val })"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Customer Name </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    outlined
                    dense
                    hide-bottom-space
                    requird
                    :model-value="customer.name"
                    @update:model-value="(val) => (customer = { name: val })"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Handphone</label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    outlined
                    dense
                    hide-bottom-space
                    requird
                    :model-value="customer.handphone"
                    @update:model-value="
                      (val) => (customer = { handphone: val })
                    "
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Telpon</label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    outlined
                    dense
                    hide-bottom-space
                    requird
                    :model-value="customer.telpone"
                    @update:model-value="(val) => (customer = { telpone: val })"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Email </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    outlined
                    dense
                    hide-bottom-space
                    requird
                    :model-value="customer.email"
                    @update:model-value="(val) => (customer = { email: val })"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12"
              >
                <label class="text-bold">Address </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    outlined
                    dense
                    hide-bottom-space
                    requird
                    :model-value="customer.addres"
                    @update:model-value="(val) => (customer = { addres: val })"
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
                    @click="onReset"
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

<script setup lang="ts">
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const customer = computed({
  get() {
    return store.getters["customer/getCustomer"];
  },
  set(value) {
    store.commit("customer/setCustomer", value);
  },
});

const onBack = () => {
  router.go(-1);
};

const onSubmit = async () => {
  await store.dispatch("customer/submitCustomer", { router });
};

const onReset = () => {
  store.commit("customer/resetCustomer");
};
</script>
