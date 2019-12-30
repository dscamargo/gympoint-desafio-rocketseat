import {call, put, delay} from 'redux-saga/effects';
import api from '~/services/api';
import {Alert} from 'react-native';

import OrdersActions from '../ducks/orders';

export function* getOrders({data}) {
  const {id, page} = data;

  const query = `?page=${page}&per_page=10`;

  yield delay(500);

  try {
    const response = yield call(api.get, `/students/${id}/help-orders${query}`);
    yield put(OrdersActions.ordersGetSuccess(response.data));
  } catch (err) {
    yield put(OrdersActions.ordersGetFailure());
    Alert.alert(`${err.response.data.error}`);
  }
}

export function* createOrder({data}) {
  const {id, question, onSubmit, setPage} = data;

  try {
    yield call(api.post, `/students/${id}/help-orders`, {question});
    if (setPage) {
      setPage(1);
    }
    yield put(OrdersActions.ordersCreateSuccess());
    Alert.alert('Pedido de auxílio realizado com sucesso');
    if (onSubmit) {
      onSubmit();
    }
  } catch (err) {
    yield put(OrdersActions.ordersCreateFailure());
    Alert.alert(`${err.response.data.error}`);
  }
}
