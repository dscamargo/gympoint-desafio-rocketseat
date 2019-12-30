import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import history from '~/services/history';
import { store } from '~/store';

import {
  getPlansSuccess,
  getPlansRequest,
  failure,
  success,
  getPlanDetailsSuccess,
  getAllPlansSuccess,
} from '~/store/modules/plans/actions';

import api from '~/services/api';

export function* getPlans({ payload }) {
  const { page, per_page } = payload;
  try {
    const response = yield call(
      api.get,
      `/plans?page=${page}&per_page=${per_page}`
    );

    yield put(getPlansSuccess(response.data));
  } catch (error) {
    yield put(failure());
  }
}

export function* deletePlan({ payload }) {
  const { id } = payload;
  const { page, per_page } = store.getState().plans;
  try {
    yield call(api.delete, `/plans/${id}`);
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Remover plano',
        message: 'Plano excluido com sucesso',
      })
    );
    yield put(success());
    yield put(getPlansRequest(page, per_page));
  } catch (error) {
    yield put(failure());
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Remover plano',
        message: error.response.data.error,
      })
    );
  }
}

export function* createPlan({ payload }) {
  const { data } = payload;
  const { page, per_page } = store.getState().plans;
  try {
    yield call(api.post, `/plans`, data);
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Criar plano',
        message: 'Plano criado com sucesso',
      })
    );
    yield put(success());
    yield put(getPlansRequest(page, per_page));
    history.push('/dashboard/plans');
  } catch (error) {
    yield put(failure());
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Criar plano',
        message: 'Problema na criação de plano',
      })
    );
  }
}

export function* getPlanDetails({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(api.get, `/plans/${id}`);
    yield put(getPlanDetailsSuccess(response.data));
  } catch (error) {
    yield put(failure());
  }
}

export function* editPlan({ payload }) {
  const { data } = payload;
  const { id, ...rest } = data;
  try {
    yield call(api.put, `/plans/${id}`, rest);
    yield put(success());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Editar plano',
        message: 'Plano editado com sucesso',
      })
    );
    history.push('/dashboard/plans');
  } catch (error) {
    yield put(failure());
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Editar plano',
        message: 'Erro ao editar plano',
      })
    );
  }
}

export function* getAllPlans() {
  try {
    const response = yield call(api.get, `/plans?page=1&per_page=all`);
    yield put(getAllPlansSuccess(response.data));
  } catch (error) {
    yield put(failure());
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Editar plano',
        message: 'Erro ao editar plano',
      })
    );
  }
}

export default all([
  takeLatest('@plans/GET_LIST_REQUEST', getPlans),
  takeLatest('@plans/DELETE_PLAN_REQUEST', deletePlan),
  takeLatest('@plans/CREATE_PLAN_REQUEST', createPlan),
  takeLatest('@plans/GET_PLAN_DETAILS_REQUEST', getPlanDetails),
  takeLatest('@plans/EDIT_PLAN_REQUEST', editPlan),
  takeLatest('@plans/GET_ALL_PLANS_REQUEST', getAllPlans),
]);
