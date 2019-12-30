import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import auth from '~/store/modules/auth/reducers';
import students from '~/store/modules/students/reducers';
import plans from '~/store/modules/plans/reducers';
import registers from '~/store/modules/registers/reducers';
import orders from '~/store/modules/orders/reducers';

export default combineReducers({
  auth,
  students,
  plans,
  registers,
  orders,
  toastr: toastrReducer,
});
