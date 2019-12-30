import produce from 'immer';

const INITIAL_STATE = {
  orders: [],
  orderDetails: {},
  loading: false,
  page: 1,
  per_page: 10,
  modalIsOpen: false,
};

export default function initFunction(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@orders/GET_HELP_ORDERS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@orders/GET_HELP_ORDERS_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
        draft.orders = action.payload.data;
      });
    case '@orders/GET_HELP_ORDER_DETAILS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@orders/GET_HELP_ORDER_DETAILS_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
        draft.orderDetails = action.payload.data;
      });
    case '@orders/UPDATE_HELP_ORDER_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@orders/UPDATE_HELP_ORDER_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@orders/FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@orders/SET_PAGE':
      return produce(state, draft => {
        draft.loading = false;
        draft.page = action.payload.page;
      });
    case '@orders/SET_PER_PAGE':
      return produce(state, draft => {
        draft.loading = false;
        draft.per_page = action.payload.per_page;
      });
    case '@orders/SET_MODAL_IS_OPENED':
      return produce(state, draft => {
        draft.loading = false;
        draft.modalIsOpen = action.payload.status;
      });
    default:
      return state;
  }
}
