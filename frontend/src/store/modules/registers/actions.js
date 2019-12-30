export function getRegistersRequest(page, per_page) {
  return {
    type: '@registers/GET_LIST_REQUEST',
    payload: { page, per_page },
  };
}

export function getRegistersSuccess(data) {
  return {
    type: '@registers/GET_LIST_SUCCESS',
    payload: { data },
  };
}

export function failure() {
  return {
    type: '@registers/FAILURE',
  };
}

export function setPerPage(data) {
  return {
    type: '@registers/SET_PER_PAGE',
    payload: { data },
  };
}

export function setPage(data) {
  return {
    type: '@registers/SET_PAGE',
    payload: { data },
  };
}

export function createRegisterRequest(data) {
  return {
    type: '@registers/CREATE_REGISTER_REQUEST',
    payload: { data },
  };
}

export function createRegisterSuccess() {
  return {
    type: '@registers/CREATE_REGISTER_SUCCESS',
  };
}

export function removeRegisterRequest(id) {
  return {
    type: '@registers/REMOVE_REGISTER_REQUEST',
    payload: { id },
  };
}

export function removeRegisterSuccess() {
  return {
    type: '@registers/REMOVE_REGISTER_SUCCESS',
  };
}

export function registerDetailsRequest(id) {
  return {
    type: '@registers/GET_REGISTER_DETAILS_REQUEST',
    payload: { id },
  };
}

export function registerDetailsSuccess(data) {
  return {
    type: '@registers/GET_REGISTER_DETAILS_SUCCESS',
    payload: { data },
  };
}

export function editRegisterRequest(data) {
  return {
    type: '@registers/EDIT_REGISTER_REQUEST',
    payload: { data },
  };
}

export function editRegisterSuccess() {
  return {
    type: '@registers/EDIT_REGISTER_SUCCESS',
  };
}
