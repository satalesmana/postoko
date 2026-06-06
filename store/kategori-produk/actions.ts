import { Loading, Dialog } from "quasar";

export async function fetchListKategoriProduk({ commit }: any) {
  try {
    Loading.show();
    const { data, error } = await useFetch("/api/kategori-produk");
    if (error.value) throw error;

    if (data.value?.data) {
      commit("setListKategoriProduk", data.value?.data);
    }
  } catch (error) {
    showNotify({ name: "[fetchListKategoriProduk]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function fetchKategoriProdukById({ commit }: any, id: string) {
  try {
    Loading.show();
    const { data, error } = await useFetch(`/api/kategori-produk/${id}`);
    if (error.value) throw error;

    if (data.value?.data?.length) {
      commit("setKategoriProdukForm", data.value.data[0]);
    }
  } catch (error) {
    showNotify({ name: "[fetchKategoriProdukById]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function submitData({ getters }: any) {
  try {
    Loading.show();
    const { $router } = useNuxtApp();
    const body = getters.getFormInput;

    const { data, error } = await useFetch("/api/kategori-produk", {
      method: "POST",
      body,
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/persediaan/kategori-produk");
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

    const { data, error } = await useFetch(`/api/kategori-produk/${id}`, {
      method: "PUT",
      body,
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/persediaan/kategori-produk");
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
    const { data, error } = await useFetch("/api/kategori-produk", {
      method: "DELETE",
      body: { ids },
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      dispatch("fetchListKategoriProduk");
    });
  } catch (error) {
    showErorrDialog({ name: "[deleteData]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}
