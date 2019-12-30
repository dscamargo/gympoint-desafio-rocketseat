import {all, takeLatest} from 'redux-saga/effects';

import {CheckinsTypes} from '../ducks/checkins';
import {OrdersTypes} from '../ducks/orders';

import {getCheckins, newCheckin} from './checkins';
import {getOrders, createOrder} from './orders';

export default function* rootSaga() {
  yield all([
    takeLatest(CheckinsTypes.CHECKINS_LIST_REQUEST, getCheckins),
    takeLatest(CheckinsTypes.CHECKINS_NEW_REQUEST, newCheckin),

    takeLatest(OrdersTypes.ORDERS_GET_REQUEST, getOrders),
    takeLatest(OrdersTypes.ORDERS_CREATE_REQUEST, createOrder),
  ]);
}
