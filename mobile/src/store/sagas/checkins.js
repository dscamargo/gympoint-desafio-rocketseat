import {call, put} from 'redux-saga/effects';
import api from '~/services/api';
import {Alert} from 'react-native';

import CheckinsActions from '../ducks/checkins';
import MeActions from '../ducks/me';

export function* getCheckins({data}) {
  const {id, page, onSubmit} = data;

  const query = `?page=${page}&per_page=10`;

  try {
    const response = yield call(api.get, `/students/${id}/checkins${query}`);
    if (onSubmit) {
      yield put(MeActions.meSetUserId(id));
      onSubmit();
    } else {
      yield put(CheckinsActions.checkinsListSuccess(response.data));
    }
  } catch (err) {
    yield put(CheckinsActions.checkinsListFailure());
    Alert.alert(
      'Atenção',
      `${(err &&
        err.response &&
        err.response.data &&
        err.response.data.error) ||
        'Erro ao realizar login, tente novamente'}`,
    );
  }
}

export function* newCheckin({data}) {
  const {id, setPage} = data;

  try {
    yield call(api.post, `/students/${id}/checkins`);
    Alert.alert('Checkin realizado com sucesso');
    yield put(CheckinsActions.checkinsNewSuccess());
    if (setPage) {
      setPage(1);
    }
    yield put(CheckinsActions.checkinsListRequest({id, page: 1}));
  } catch (err) {
    yield put(CheckinsActions.checkinsListFailure());
    Alert.alert(`${err.response.data.error}`);
  }
}
