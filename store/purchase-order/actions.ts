import { Loading, Dialog } from "quasar";
import type { PurchaseOrder } from "./interface";

export async function fetchListPurchaseOrder({ commit }: any) {
  try {
    Loading.show();
    const { data, error } = await useFetch("/api/purchase-order");
    if (error.value) throw error;

    if (data.value?.data) {
      commit("setListPurchaseOrder", data.value?.data);
    }
  } catch (error) {
    showNotify({ name: "[fetchListPurchaseOrder]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function fetchPurchaseOrderById({ commit }: any, id: string) {
  try {
    Loading.show();
    const { data, error } = await useFetch(`/api/purchase-order/${id}`);
    if (error.value) throw error;

    if (data.value?.data?.length) {
      commit("setPurchaseOrderForm", (data.value.data as PurchaseOrder[])[0]);
    }
  } catch (error) {
    showNotify({ name: "[fetchPurchaseOrderById]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function submitData({ getters }: any) {
  try {
    Loading.show();
    const { $router } = useNuxtApp();
    const body = getters.getFormInput;

    const { data, error } = await useFetch("/api/purchase-order", {
      method: "POST",
      body,
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/purchasing/order");
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

    const { data, error } = await useFetch(`/api/purchase-order/${id}`, {
      method: "PUT",
      body,
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/purchasing/order");
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
    const { data, error } = await useFetch("/api/purchase-order", {
      method: "DELETE",
      body: { ids },
    });

    if (error.value) throw error;

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      dispatch("fetchListPurchaseOrder");
    });
  } catch (error) {
    showErorrDialog({ name: "[deleteData]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}
