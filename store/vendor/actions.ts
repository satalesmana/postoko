import { Loading, Dialog } from "quasar";

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
