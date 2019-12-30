export function getPlansRequest(page, per_page) {
  return {
    type: '@plans/GET_LIST_REQUEST',
    payload: { page, per_page },
  };
}

export function getAllPlansRequest() {
  return {
    type: '@plans/GET_ALL_PLANS_REQUEST',
  };
}

export function getAllPlansSuccess(data) {
  return {
    type: '@plans/GET_ALL_PLANS_SUCCESS',
    payload: { data },
  };
}

export function getPlansSuccess(data) {
  return {
    type: '@plans/GET_LIST_SUCCESS',
    payload: { data },
  };
}

export function deletePlanRequest(id) {
  return {
    type: '@plans/DELETE_PLAN_REQUEST',
    payload: { id },
  };
}

export function setPage(page) {
  return {
    type: '@plans/SET_PAGE',
    payload: { page },
  };
}

export function setPerPage(per_page) {
  return {
    type: '@plans/SET_PER_PAGE',
    payload: { per_page },
  };
}

export function success() {
  return {
    type: '@plans/SUCCESS',
  };
}

export function failure() {
  return {
    type: '@plans/FAILURE',
  };
}

export function createPlanRequest(data) {
  return {
    type: '@plans/CREATE_PLAN_REQUEST',
    payload: { data },
  };
}

export function getPlanDetailsRequest(id) {
  return {
    type: '@plans/GET_PLAN_DETAILS_REQUEST',
    payload: { id },
  };
}

export function getPlanDetailsSuccess(data) {
  return {
    type: '@plans/GET_PLAN_DETAILS_SUCCESS',
    payload: { data },
  };
}

export function editPlanRequest(data) {
  return {
    type: '@plans/EDIT_PLAN_REQUEST',
    payload: { data },
  };
}
