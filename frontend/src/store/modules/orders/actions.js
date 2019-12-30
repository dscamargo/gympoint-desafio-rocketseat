export function getHelpOrdersRequest(page, per_page) {
  return {
    type: '@orders/GET_HELP_ORDERS_REQUEST',
    payload: { page, per_page },
  };
}

export function getHelpOrdersSuccess(data) {
  return {
    type: '@orders/GET_HELP_ORDERS_SUCCESS',
    payload: { data },
  };
}

export function getHelpOrderDetailsRequest(id) {
  return {
    type: '@orders/GET_HELP_ORDER_DETAILS_REQUEST',
    payload: { id },
  };
}

export function getHelpOrderDetailsSuccess(data) {
  return {
    type: '@orders/GET_HELP_ORDER_DETAILS_SUCCESS',
    payload: { data },
  };
}

export function updateHelpOrderRequest(data) {
  return {
    type: '@orders/UPDATE_HELP_ORDER_REQUEST',
    payload: { data },
  };
}

export function updateHelpOrderSuccess() {
  return {
    type: '@orders/UPDATE_HELP_ORDER_SUCCESS',
  };
}

export function setPage(page) {
  return {
    type: '@orders/SET_PAGE',
    payload: { page },
  };
}

export function setPerPage(per_page) {
  return {
    type: '@orders/SET_PER_PAGE',
    payload: { per_page },
  };
}

export function setModalIsOpened(status) {
  return {
    type: '@orders/SET_MODAL_IS_OPENED',
    payload: { status },
  };
}

export function failure() {
  return {
    type: '@orders/FAILURE',
  };
}
