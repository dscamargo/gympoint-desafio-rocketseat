import produce from 'immer';

const INITIAL_STATE = {
  plans: {},
  planDetails: {},
  plansSelect: [],
  loading: false,
  page: 1,
  per_page: 10,
};

export default function initFunction(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@plans/REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@plans/SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@plans/FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@plans/SET_PAGE':
      return produce(state, draft => {
        draft.page = action.payload.page;
      });
    case '@plans/SET_PER_PAGE':
      return produce(state, draft => {
        draft.per_page = action.payload.per_page;
      });
    case '@plans/GET_LIST_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
        draft.plans = action.payload.data;
      });
    case '@plans/DELETE_PLAN_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@plans/CREATE_PLAN_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@plans/GET_PLAN_DETAILS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@plans/GET_PLAN_DETAILS_SUCCESS':
      return produce(state, draft => {
        draft.planDetails = action.payload.data;
        draft.loading = false;
      });
    case '@plans/EDIT_PLAN_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@plans/GET_ALL_PLANS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@plans/GET_ALL_PLANS_SUCCESS':
      return produce(state, draft => {
        const select = [];
        action.payload.data.forEach(item => {
          select.push({
            ...item,
            label: item.title,
            value: item.title,
          });
        });
        draft.plansSelect = select;
      });

    default:
      return state;
  }
}
