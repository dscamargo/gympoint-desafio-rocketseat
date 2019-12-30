import {combineReducers} from 'redux';

import {reducer as checkins} from '~/store/ducks/checkins';
import {reducer as me} from '~/store/ducks/me';
import {reducer as orders} from '~/store/ducks/orders';

const reducers = combineReducers({
  checkins,
  me,
  orders,
});

export default reducers;
