import produce from 'immer';

const INITIAL_STATE = {
  students: [],
  studentsSelect: [],
  studentDetails: {},
  loading: false,
  page: 1,
  per_page: 10,
  search: '',
};

export default function initFunction(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@students/REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@students/SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@students/FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });

    case '@students/GET_LIST_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@students/GET_LIST_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
        draft.students = action.payload.data;
      });
    case '@students/GET_STUDENTS_SELECT_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@students/GET_STUDENTS_SELECT_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
        const std = [];
        action.payload.data.data.forEach(item => {
          std.push({ label: item.name, id: item.id });
        });
        draft.studentsSelect = std;
      });
    case '@students/SET_PAGE':
      return produce(state, draft => {
        draft.page = action.payload.page;
      });
    case '@students/SET_PER_PAGE':
      return produce(state, draft => {
        draft.per_page = action.payload.per_page;
      });

    case '@students/SET_SEARCH':
      return produce(state, draft => {
        draft.search = action.payload.search;
      });
    case '@students/CREATE_STUDENTS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@students/CLEAR_STUDENTS_LIST':
      return produce(state, draft => {
        draft.students = [];
        draft.studentsSelect = [];
      });
    case '@students/GET_STUDENT_DETAILS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@students/GET_STUDENT_DETAILS_SUCCESS':
      return produce(state, draft => {
        draft.studentDetails = action.payload.data;
        draft.loading = false;
      });
    case '@students/EDIT_STUDENT_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@students/DELETE_STUDENT_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    default:
      return state;
  }
}
