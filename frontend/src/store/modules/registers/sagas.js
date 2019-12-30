import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import history from '~/services/history';
import { store } from '~/store';

import {
  getRegistersSuccess,
  getRegistersRequest,
  createRegisterSuccess,
  failure,
  removeRegisterSuccess,
  registerDetailsSuccess,
  editRegisterSuccess,
} from '~/store/modules/registers/actions';

import api from '~/services/api';

export function* getRegisters({ payload }) {
  const { page, per_page } = payload;
  try {
    const response = yield call(
      api.get,
      `/registrations?page=${page}&per_page=${per_page}`
    );

    yield put(getRegistersSuccess(response.data));
  } catch (error) {
    yield put(failure());
  }
}

export function* createRegister({ payload }) {
  const { data } = payload;
  try {
    yield call(api.post, `/registrations`, data);

    yield put(createRegisterSuccess());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Matrícula',
        message: 'Matrícula realizada com sucesso',
      })
    );
    history.push('/dashboard/registers');
  } catch (error) {
    yield put(failure());
  }
}

export function* removeRegister({ payload }) {
  const { page, per_page } = store.getState().registers;
  const { id } = payload;
  try {
    yield call(api.delete, `/registrations/${id}`);
    yield put(removeRegisterSuccess());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Matrícula',
        message: 'Matrícula removida com sucesso',
      })
    );
    yield put(getRegistersRequest(page, per_page));
  } catch (error) {
    yield put(failure());
  }
}

export function* registerDetails({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(api.get, `/registrations/${id}`);
    yield put(registerDetailsSuccess(response.data));
  } catch (error) {
    yield put(failure());
  }
}

export function* editRegister({ payload }) {
  const { data } = payload;
  const { id, ...rest } = data;
  try {
    yield call(api.put, `/registrations/${id}`, rest);
    yield put(editRegisterSuccess());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Matrícula',
        message: 'Matrícula editada com sucesso',
      })
    );
    history.push('/dashboard/registers');
  } catch (error) {
    yield put(failure());
  }
}

export default all([
  takeLatest('@registers/GET_LIST_REQUEST', getRegisters),
  takeLatest('@registers/CREATE_REGISTER_REQUEST', createRegister),
  takeLatest('@registers/REMOVE_REGISTER_REQUEST', removeRegister),
  takeLatest('@registers/GET_REGISTER_DETAILS_REQUEST', registerDetails),
  takeLatest('@registers/EDIT_REGISTER_REQUEST', editRegister),
]);
