import { Loading, Dialog } from "quasar";

export async function fetchListProduk({ commit }: any) {
  try {
    Loading.show();
    const { data, error } = await useFetch("/api/produk");
    if (error.value) throw error;

    if (data.value?.data) {
      commit("setListProduk", data.value?.data);
    }
  } catch (error) {
    showNotify({ name: "[fetchListProduk]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function fetchProdukById({ commit }: any, id: string) {
  try {
    Loading.show();
    const { data, error } = await useFetch(`/api/produk/${id}`);
    if (error.value) throw error;

    if (data.value?.data?.length) {
      commit("setProdukForm", data.value.data[0]);
    }
  } catch (error) {
    showNotify({ name: "[fetchProdukById]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function submitData({ getters }: any) {
  try {
    Loading.show();
    const { $router } = useNuxtApp();
    const body = getters.getFormInput;

    const { data, error } = await useFetch("/api/produk", {
      method: "POST",
      body,
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/persediaan/produk");
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

    const { data, error } = await useFetch(`/api/produk/${id}`, {
      method: "PUT",
      body,
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/persediaan/produk");
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
    const { data, error } = await useFetch("/api/produk", {
      method: "DELETE",
      body: { ids },
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      dispatch("fetchListProduk");
    });
  } catch (error) {
    showErorrDialog({ name: "[deleteData]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}
