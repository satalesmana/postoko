<template>
  <div class="q-mt-lg">
    <div class="bg-primary text-white q-pa-sm q-mb-md row items-center">
      <span class="text-bold">Line</span>
      <q-space />
      <q-btn
        unelevated
        color="positive"
        icon="add"
        label="Add Row"
        dense
        @click="onAddRow"
      />
    </div>

    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="_index"
      hide-pagination
      :rows-per-page-options="[0]"
    >
      <template #body-cell-produk="props">
        <q-td :props="props">
          <q-select
            v-if="isEditing(props.row._index)"
            :model-value="props.row.produk"
            outlined
            dense
            hide-bottom-space
            emit-value
            map-options
            option-value="value"
            option-label="label"
            :options="produkOptions"
            style="min-width: 160px"
            @update:model-value="
              (val) => onUpdateLine(props.row._index, { produk: val })
            "
          >
            <template v-if="!props.row.produk" #selected>
              <div class="text-grey-6">- Pilih Produk -</div>
            </template>
          </q-select>
          <span v-else>
            {{ produkCode(props.row.produk) }}
          </span>
        </q-td>
      </template>

      <template #body-cell-namaProduk="props">
        <q-td :props="props">{{ produkName(props.row.produk) }}</q-td>
      </template>

      <template #body-cell-kategori="props">
        <q-td :props="props">{{ produkKategori(props.row.produk) }}</q-td>
      </template>

      <template #body-cell-qty="props">
        <q-td :props="props">
          <q-input
            v-if="isEditing(props.row._index)"
            :model-value="props.row.qty"
            outlined
            dense
            hide-bottom-space
            type="number"
            style="width: 90px"
            @update:model-value="
              (val) => onUpdateLine(props.row._index, { qty: Number(val) })
            "
          />
          <span v-else>{{ props.row.qty }}</span>
        </q-td>
      </template>

      <template #body-cell-satuan="props">
        <q-td :props="props">
          <q-select
            v-if="isEditing(props.row._index)"
            :model-value="props.row.satuan"
            outlined
            dense
            hide-bottom-space
            emit-value
            map-options
            option-value="value"
            option-label="label"
            :options="satuanOptions"
            style="min-width: 140px"
            @update:model-value="
              (val) => onUpdateLine(props.row._index, { satuan: val })
            "
          >
            <template v-if="!props.row.satuan" #selected>
              <div class="text-grey-6">- Pilih Satuan -</div>
            </template>
          </q-select>
          <span v-else>{{ satuanCode(props.row.satuan) }}</span>
        </q-td>
      </template>

      <template #body-cell-harga="props">
        <q-td :props="props">
          <q-input
            v-if="isEditing(props.row._index)"
            :model-value="props.row.harga"
            outlined
            dense
            hide-bottom-space
            type="number"
            style="width: 110px"
            @update:model-value="
              (val) => onUpdateLine(props.row._index, { harga: Number(val) })
            "
          />
          <span v-else>{{ formatCurrency(props.row.harga) }}</span>
        </q-td>
      </template>

      <template #body-cell-discount="props">
        <q-td :props="props">
          <q-input
            v-if="isEditing(props.row._index)"
            :model-value="props.row.discount"
            outlined
            dense
            hide-bottom-space
            type="number"
            style="width: 110px"
            @update:model-value="
              (val) => onUpdateLine(props.row._index, { discount: Number(val) })
            "
          />
          <span v-else>{{ formatCurrency(props.row.discount) }}</span>
        </q-td>
      </template>

      <template #body-cell-total="props">
        <q-td :props="props">{{ formatCurrency(props.row.total) }}</q-td>
      </template>

      <template #body-cell-keterangan="props">
        <q-td :props="props">
          <q-input
            v-if="isEditing(props.row._index)"
            :model-value="props.row.keterangan"
            outlined
            dense
            hide-bottom-space
            style="min-width: 140px"
            @update:model-value="
              (val) => onUpdateLine(props.row._index, { keterangan: val })
            "
          />
          <span v-else>{{ props.row.keterangan }}</span>
        </q-td>
      </template>

      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            color="primary"
            :icon="isEditing(props.row._index) ? 'check' : 'edit'"
            @click="onToggleEdit(props.row._index)"
          />
          <q-btn
            flat
            round
            dense
            color="negative"
            icon="delete"
            @click="onRemoveRow(props.row._index)"
          />
        </q-td>
      </template>
    </q-table>

    <div class="q-gutter-sm q-mt-lg text-right">
      <q-btn unelevated color="negative" label="Cancel" @click="onCancel" />
      <q-btn unelevated color="primary" label="Simpan" @click="onSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const lines = computed(() => store.getters["purchaseOrder/getLines"]);
const rows = computed(() =>
  lines.value.map((line: any, index: number) => ({ ...line, _index: index })),
);

const columns = ref([
  {
    name: "no",
    label: "No",
    field: (row: any) => row._index + 1,
    align: "center",
  },
  { name: "produk", label: "Kode Produk", field: "produk", align: "left" },
  { name: "namaProduk", label: "Nama Produk", field: "produk", align: "left" },
  {
    name: "kategori",
    label: "Kategori Produk",
    field: "produk",
    align: "left",
  },
  { name: "qty", label: "QTY", field: "qty", align: "center" },
  { name: "satuan", label: "Satuan", field: "satuan", align: "left" },
  { name: "harga", label: "Harga", field: "harga", align: "right" },
  { name: "discount", label: "Discount", field: "discount", align: "right" },
  { name: "total", label: "Total Harga", field: "total", align: "right" },
  {
    name: "keterangan",
    label: "Keterangan",
    field: "keterangan",
    align: "left",
  },
  { name: "action", label: "Action", field: "action", align: "center" },
]);

const produkList = computed(() => store.getters["produk/getListProduk"]);
const satuanList = computed(() => store.getters["satuan/getListSatuan"]);

const produkOptions = computed(() =>
  produkList.value.map((p: any) => ({
    label: `${p.code_produk} - ${p.name}`,
    value: p._id,
  })),
);

const satuanOptions = computed(() =>
  satuanList.value.map((s: any) => ({
    label: `${s.code} - ${s.name}`,
    value: s._id,
  })),
);

const produkById = (id: string) =>
  produkList.value.find((p: any) => p._id === id);

const satuanById = (id: string) =>
  satuanList.value.find((s: any) => s._id === id);

const produkCode = (id: string) => produkById(id)?.code_produk ?? "-";
const produkName = (id: string) => produkById(id)?.name ?? "-";
const produkKategori = (id: string) => produkById(id)?.kategori?.name ?? "-";
const satuanCode = (id: string) => satuanById(id)?.code ?? "-";

const formatCurrency = (value: number) =>
  `Rp ${(value ?? 0).toLocaleString("id-ID")}`;

const editingIndexes = ref<number[]>([]);

const isEditing = (index: number) => editingIndexes.value.includes(index);

const onToggleEdit = (index: number) => {
  if (isEditing(index)) {
    editingIndexes.value = editingIndexes.value.filter(
      (i: number) => i !== index,
    );
  } else {
    editingIndexes.value = [...editingIndexes.value, index];
  }
};

const onAddRow = () => {
  store.commit("purchaseOrder/addLine");
  editingIndexes.value = [...editingIndexes.value, lines.value.length - 1];
};

const onUpdateLine = (index: number, payload: Record<string, any>) => {
  store.commit("purchaseOrder/updateLine", { index, payload });
};

const onRemoveRow = (index: number) => {
  store.commit("purchaseOrder/removeLine", index);
  editingIndexes.value = editingIndexes.value
    .filter((i: number) => i !== index)
    .map((i: number) => (i > index ? i - 1 : i));
};

const onCancel = () => {
  store.commit("purchaseOrder/clearPurchaseOrderForm");
  router.push("/purchasing/order");
};

const onSubmit = () => {
  const formInput = store.getters["purchaseOrder/getFormInput"];
  if (formInput._id) {
    store.dispatch("purchaseOrder/updateData");
  } else {
    store.dispatch("purchaseOrder/submitData");
  }
};

onNuxtReady(() => {
  store.dispatch("produk/fetchListProduk");
  store.dispatch("satuan/fetchListSatuan");
});
</script>
