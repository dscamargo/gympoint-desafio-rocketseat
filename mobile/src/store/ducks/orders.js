import {createReducer, createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  ordersGetRequest: ['data'],
  ordersGetSuccess: ['data'],
  ordersGetFailure: null,
  ordersCreateRequest: ['data'],
  ordersCreateSuccess: null,
  ordersCreateFailure: null,
});

export const OrdersTypes = Types;
export default Creators;

const INITIAL_STATE = {
  helpOrders: [],
  meta: 0,
  loading: false,
};

export const success = state => ({
  ...state,
  loading: false,
});

export const request = state => ({
  ...state,
  loading: true,
});

export const failure = state => ({
  ...state,
  loading: false,
});

export const getHelpOrders = (state, {data}) => {
  return {
    ...state,
    loading: false,
    meta: data.meta,
    helpOrders:
      Number(data.meta.page) === 1
        ? data.data
        : [...state.helpOrders, ...data.data],
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDERS_GET_REQUEST]: request,
  [Types.ORDERS_GET_SUCCESS]: getHelpOrders,
  [Types.ORDERS_GET_FAILURE]: failure,
  [Types.ORDERS_CREATE_REQUEST]: request,
  [Types.ORDERS_CREATE_SUCCESS]: success,
  [Types.ORDERS_CREATE_FAILURE]: failure,
});
