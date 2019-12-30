import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import {
  getHelpOrdersSuccess,
  failure,
  getHelpOrderDetailsSuccess,
  updateHelpOrderSuccess,
  getHelpOrdersRequest,
  setModalIsOpened,
} from '~/store/modules/orders/actions';

import api from '~/services/api';

export function* getHelpOrders({ payload }) {
  const { page, per_page } = payload;
  try {
    const response = yield call(
      api.get,
      `/help-orders?page=${page}&per_page=${per_page}`
    );

    yield put(getHelpOrdersSuccess(response.data));
  } catch (error) {
    yield put(failure());
  }
}

export function* getDetails({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(api.get, `/help-orders/${id}`);
    yield put(getHelpOrderDetailsSuccess(response.data));
  } catch (error) {
    yield put(failure());
  }
}

export function* updateHelpOrder({ payload }) {
  const { data } = payload;
  const { id, ...rest } = data;
  try {
    yield call(api.put, `/help-orders/${id}/answer`, rest);
    yield put(updateHelpOrderSuccess());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Responder pergunta',
        message: 'Pergunta respondida com sucesso',
      })
    );
    yield put(setModalIsOpened(false));
    yield put(getHelpOrdersRequest(1, 10));
  } catch (error) {
    yield put(failure());
  }
}

export default all([
  takeLatest('@orders/GET_HELP_ORDERS_REQUEST', getHelpOrders),
  takeLatest('@orders/GET_HELP_ORDER_DETAILS_REQUEST', getDetails),
  takeLatest('@orders/UPDATE_HELP_ORDER_REQUEST', updateHelpOrder),
]);
