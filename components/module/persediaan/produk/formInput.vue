<template>
  <div class="q-ma-lg">
    <CustomeTitle icon="inventory_2" :label="isEdit ? 'Edit Produk' : 'Add New Produk'" />
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

            <span class="text-bold">{{ isEdit ? 'Edit Produk' : 'Produk Form' }}</span>
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
                <label class="text-bold">Code Produk <span class="text-red">*</span></label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model="formCodeProduk"
                    outlined
                    dense
                    hide-bottom-space
                    :rules="[(v) => !!v || 'Kode produk wajib diisi']"
                    placeholder="Contoh: PRD-001"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <label class="text-bold">Nama Produk <span class="text-red">*</span></label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model="formName"
                    outlined
                    dense
                    hide-bottom-space
                    :rules="[(v) => !!v || 'Nama produk wajib diisi']"
                    placeholder="Nama produk"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <label class="text-bold">Kategori <span class="text-red">*</span></label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-select
                    v-model="formKategori"
                    outlined
                    dense
                    hide-bottom-space
                    :options="kategoriOptions"
                    emit-value
                    map-options
                    option-value="value"
                    option-label="label"
                    :rules="[(v) => !!v || 'Kategori wajib dipilih']"
                    placeholder="Pilih kategori"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div class="text-right q-pr-md col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <label class="text-bold">Merek</label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input">
                  <q-input
                    v-model="formMerek"
                    outlined
                    dense
                    hide-bottom-space
                    placeholder="Merek produk"
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

const formCodeProduk = computed({
  get: () => store.getters["produk/getFormInput"].code_produk,
  set: (val: string) => store.commit("produk/setProdukForm", { code_produk: val }),
});

const formName = computed({
  get: () => store.getters["produk/getFormInput"].name,
  set: (val: string) => store.commit("produk/setProdukForm", { name: val }),
});

const formKategori = computed({
  get: () => store.getters["produk/getFormInput"].kategori,
  set: (val: string) => store.commit("produk/setProdukForm", { kategori: val }),
});

const formMerek = computed({
  get: () => store.getters["produk/getFormInput"].merek,
  set: (val: string) => store.commit("produk/setProdukForm", { merek: val }),
});

const kategoriOptions = computed(() =>
  store.getters["kategoriProduk/getListKategoriProduk"].map((k: any) => ({
    label: `${k.code} - ${k.name}`,
    value: k._id,
  }))
);

const onBack = () => {
  router.push("/persediaan/produk");
};

const onSubmit = () => {
  if (props.isEdit) {
    store.dispatch("produk/updateData");
  } else {
    store.dispatch("produk/submitData");
  }
};

const onReset = () => {
  store.commit("produk/clearProdukForm");
  formRef.value?.resetValidation();
};

onNuxtReady(() => {
  store.dispatch("kategoriProduk/fetchListKategoriProduk");
  if (props.isEdit && route.params.id) {
    store.dispatch("produk/fetchProdukById", route.params.id);
  }
});
</script>
