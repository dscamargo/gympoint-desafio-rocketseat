import { all, takeLatest, call, put } from 'redux-saga/effects';

import { actions as toastrActions } from 'react-redux-toastr';
import history from '~/services/history';
import { signInSuccess, signFailure } from '~/store/modules/auth/actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, `/sessions`, { email, password });

    const { name } = response.data.user;

    yield put(signInSuccess(response.data));

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Login efetuado',
        message: `Bem vindo ${name}.`,
      })
    );
    history.push('/dashboard/students');
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Atenção',
        message:
          (error &&
            error.response &&
            error.response.data &&
            error.response.data.error) ||
          'Problema na autenticação',
      })
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
