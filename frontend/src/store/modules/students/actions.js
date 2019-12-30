export function getStudentsRequest(page, per_page, search) {
  return {
    type: '@students/GET_LIST_REQUEST',
    payload: { page, per_page, search },
  };
}

export function success() {
  return {
    type: '@students/SUCCESS',
  };
}

export function failure() {
  return {
    type: '@students/FAILURE',
  };
}

export function setPage(page) {
  return {
    type: '@students/SET_PAGE',
    payload: { page },
  };
}

export function setPerPage(per_page) {
  return {
    type: '@students/SET_PER_PAGE',
    payload: { per_page },
  };
}

export function setSearch(search) {
  return {
    type: '@students/SET_SEARCH',
    payload: { search },
  };
}

export function getStudentsSuccess(data) {
  return {
    type: '@students/GET_LIST_SUCCESS',
    payload: { data },
  };
}

export function getStudentsSelectRequest(page, per_page, search) {
  return {
    type: '@students/GET_STUDENTS_SELECT_REQUEST',
    payload: { page, per_page, search },
  };
}
export function getStudentsSelectSuccess(data) {
  return {
    type: '@students/GET_STUDENTS_SELECT_SUCCESS',
    payload: { data },
  };
}

export function clearStudents() {
  return {
    type: '@students/CLEAR_STUDENTS_LIST',
  };
}

export function createStudentsRequest(data) {
  return {
    type: '@students/CREATE_STUDENTS_REQUEST',
    payload: { data },
  };
}

export function getStudentDetailsRequest(id) {
  return {
    type: '@students/GET_STUDENT_DETAILS_REQUEST',
    payload: { id },
  };
}

export function getStudentDetailsSuccess(data) {
  return {
    type: '@students/GET_STUDENT_DETAILS_SUCCESS',
    payload: { data },
  };
}

export function editStudentRequest(data) {
  return {
    type: '@students/EDIT_STUDENT_REQUEST',
    payload: { data },
  };
}

export function deleteStudentRequest(id) {
  return {
    type: '@students/DELETE_STUDENT_REQUEST',
    payload: { id },
  };
}
