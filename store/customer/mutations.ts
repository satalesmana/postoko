export function setCustomer(state: any, payload: Array<any>) {
  state.form_input = { ...state.form_input, ...payload };
}

export function resetCustomer(state: any) {
  const INITIAL_STATE = {
    code: null,
    name: null,
    handphone: null,
    telpone: null,
    email: null,
    addres: null,
  };
  state.form_input = INITIAL_STATE;
}

export function setData(state: any, payload: Array<any>) {
  state.data.table = payload.data;
  state.data.meta = payload.meta;
}
