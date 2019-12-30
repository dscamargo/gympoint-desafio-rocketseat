import { all } from 'redux-saga/effects';

import auth from '~/store/modules/auth/sagas';
import students from '~/store/modules/students/sagas';
import plans from '~/store/modules/plans/sagas';
import registers from '~/store/modules/registers/sagas';
import orders from '~/store/modules/orders/sagas';

export default function* rootSaga() {
  return yield all([auth, students, plans, registers, orders]);
}
