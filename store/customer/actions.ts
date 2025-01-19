import { Loading, Dialog } from "quasar";

export async function submitCustomer(
  { commit, getters }: any,
  { router }: any
) {
  try {
    Loading.show();

    const body = getters.getCustomer;
    const { data, error } = await useFetch("/api/customer", {
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
      router.replace("/sale/customer");
    });
  } catch (error) {
    showNotify({ name: "[submitCustomer]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}

export async function getCustomerList({ commit }: any) {
  try {
    Loading.show();
    const { data, error } = await useFetch("/api/customer");

    if (error.value) {
      throw error;
    }

    if (data.value?.data) {
      commit("setData", data.value);
    }
  } catch (error) {
    showNotify({ name: "[getCustomerList]", type: "Error", error });
  } finally {
    Loading.hide();
  }
}
