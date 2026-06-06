<template>
  <div class="q-ma-lg">
    <CustomeTitle icon="category" :label="isEdit ? 'Edit Kategori Produk' : 'Add New Kategori Produk'" />
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

            <span class="text-bold">{{ isEdit ? 'Edit Kategori Produk' : 'Form Kategori Produk' }}</span>
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
              <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <label class="text-bold">Kode Kategori <span class="text-red">*</span></label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model="formCode"
                    outlined
                    dense
                    hide-bottom-space
                    :rules="[(v) => !!v || 'Kode kategori wajib diisi']"
                    placeholder="Contoh: 01000001"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <label class="text-bold">Nama Kategori <span class="text-red">*</span></label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model="formName"
                    outlined
                    dense
                    hide-bottom-space
                    :rules="[(v) => !!v || 'Nama kategori wajib diisi']"
                    placeholder="Nama kategori produk"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
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
  get: () => store.getters["kategoriProduk/getFormInput"].code,
  set: (val: string) => store.commit("kategoriProduk/setKategoriProdukForm", { code: val }),
});

const formName = computed({
  get: () => store.getters["kategoriProduk/getFormInput"].name,
  set: (val: string) => store.commit("kategoriProduk/setKategoriProdukForm", { name: val }),
});

const onBack = () => {
  router.push("/persediaan/kategori-produk");
};

const onSubmit = () => {
  if (props.isEdit) {
    store.dispatch("kategoriProduk/updateData");
  } else {
    store.dispatch("kategoriProduk/submitData");
  }
};

const onReset = () => {
  store.commit("kategoriProduk/clearKategoriProdukForm");
  formRef.value?.resetValidation();
};

onNuxtReady(() => {
  if (props.isEdit && route.params.id) {
    store.dispatch("kategoriProduk/fetchKategoriProdukById", route.params.id);
  }
});
</script>
