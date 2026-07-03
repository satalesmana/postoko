import { Loading, Dialog } from "quasar";
import type { Vendor } from "./interface";

export async function fetchListVendor({ commit }: any) {
  try {
    Loading.show();
    const { data, error } = await useFetch("/api/vendor");
    if (error.value) {
      throw error;
    }

    if (data.value?.data) {
      commit("setListVendor", data.value?.data);
    }
  } catch (error) {
    showNotify({ name: "[fetchListVendor]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function fetchVendorById({ commit }: any, id: string) {
  try {
    Loading.show();
    const { data, error } = await useFetch(`/api/vendor/${id}`);
    if (error.value) {
      throw error;
    }

    if (data.value?.data?.length) {
      commit("setVendorForm", (data.value.data as Vendor[])[0]);
    }
  } catch (error) {
    showNotify({ name: "[fetchVendorById]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function submitData({ getters }: any) {
  try {
    Loading.show();
    const { $router } = useNuxtApp();

    const body = getters.getFormInput;
    const { data, error } = await useFetch("/api/vendor", {
      method: "POST",
      body,
    });

    if (error.value) {
      throw error;
    }

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/purchasing/vendor");
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

    const { data, error } = await useFetch(`/api/vendor/${id}`, {
      method: "PUT",
      body,
    });

    if (error.value) {
      throw error;
    }

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      $router.replace("/purchasing/vendor");
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
    const { data, error } = await useFetch("/api/vendor", {
      method: "DELETE",
      body: { _id: { $in: ids } },
    });

    if (error.value) {
      throw error;
    }

    Dialog.create({
      title: "Info",
      message: `<span class="text-green">${data.value?.message}</span>`,
      html: true,
    }).onOk(() => {
      dispatch("fetchListVendor");
    });
  } catch (error) {
    showErorrDialog({ name: "[deleteData]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}
