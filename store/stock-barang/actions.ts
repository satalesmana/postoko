import { Loading, Dialog } from "quasar";

export async function fetchListStockBarang({ commit }: any) {
  try {
    Loading.show();
    const { data, error } = await useFetch("/api/stock-barang");
    if (error.value) throw error;

    if (data.value?.data) {
      commit("setListStockBarang", data.value?.data);
    }
  } catch (error) {
    showNotify({ name: "[fetchListStockBarang]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function fetchStockBarangById({ commit }: any, id: string) {
  try {
    Loading.show();
    const { data, error } = await useFetch(`/api/stock-barang/${id}`);
    if (error.value) throw error;

    if (data.value?.data?.length) {
      const item = data.value.data[0];
      commit("setStockBarangForm", {
        ...item,
        kategori: item.kategori?._id ?? item.kategori,
        satuan: item.satuan?._id ?? item.satuan,
      });
    }
  } catch (error) {
    showNotify({ name: "[fetchStokBarangById]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function submitData({ getters }: any) {
  try {
    Loading.show();
    const { $router } = useNuxtApp();
    const body = getters.getFormInput;

    const { data, error } = await useFetch("/api/stock-barang", {
      method: "POST",
      body,
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/persediaan/stock-barang");
    });
  } catch (error) {
    showErorrDialog({ name: "[submitData]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function updateData({ getters }: any) {
  try {
    Loading.show();
    const { $router } = useNuxtApp();
    const body = getters.getFormInput;
    const id = body._id;

    const { data, error } = await useFetch(`/api/stock-barang/${id}`, {
      method: "PUT",
      body,
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/persediaan/stock-barang");
    });
  } catch (error) {
    showErorrDialog({ name: "[updateData]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function deleteData({ dispatch }: any, ids: string[]) {
  try {
    Loading.show();
    const { data, error } = await useFetch("/api/stock-barang", {
      method: "DELETE",
      body: { ids },
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      dispatch("fetchListStockBarang");
    });
  } catch (error) {
    showErorrDialog({ name: "[deleteData]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}
