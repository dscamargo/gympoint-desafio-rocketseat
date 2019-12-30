import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import history from '~/services/history';
import { store } from '~/store';

import {
  getStudentsSuccess,
  getStudentsRequest,
  failure,
  success,
  getStudentDetailsSuccess,
  getStudentsSelectSuccess,
} from '~/store/modules/students/actions';

import api from '~/services/api';

export function* getStudents({ payload }) {
  const { page, per_page, search } = payload;
  try {
    if (search) {
      yield delay(1000);
    }
    const response = yield call(
      api.get,
      `/students?page=${page}&per_page=${per_page}&q=${search}`
    );

    yield put(getStudentsSuccess(response.data));
  } catch (error) {
    yield put(failure());
  }
}

export function* getStudentsSelect({ payload }) {
  const { page, per_page, search } = payload;
  try {
    const response = yield call(
      api.get,
      `/students?page=${page}&per_page=${per_page}&q=${search}`
    );

    yield put(getStudentsSelectSuccess(response.data));
  } catch (error) {
    yield put(failure());
  }
}

export function* createStudent({ payload }) {
  const { name, email, weight, age, height } = payload.data;
  try {
    yield call(api.post, `/students`, { name, email, weight, age, height });

    yield put(success());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Registro de aluno',
        message: `Aluno registrado com sucesso`,
      })
    );
    history.push('/dashboard/students');
  } catch (error) {
    yield put(failure());
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Registro de aluno',
        message: `Ocorreu um erro ao registrar o aluno`,
      })
    );
  }
}

export function* getStudentDetails({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(api.get, `/students/${id}`);
    yield put(getStudentDetailsSuccess(response.data));
  } catch (error) {
    yield put(failure());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Detalhes de aluno',
        message: `Ocorreu um erro ao carregar as informações do aluno`,
      })
    );
  }
}

export function* editStudent({ payload }) {
  const { id, name, email, weight, age, height } = payload.data;
  try {
    yield call(api.put, `/students/${id}`, {
      name,
      email,
      weight,
      age,
      height,
    });
    yield put(success());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Edição de aluno',
        message: `Aluno editado com sucesso`,
      })
    );
    history.push('/dashboard/students');
  } catch (error) {
    yield put(failure());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Edição de aluno',
        message: `Ocorreu um erro ao editar o aluno`,
      })
    );
  }
}

export function* deleteStudent({ payload }) {
  const { id } = payload;
  const { page } = store.getState().students;
  const { per_page } = store.getState().students;
  const { search } = store.getState().students;

  try {
    yield call(api.delete, `/students/${id}`);
    yield put(success());
    yield put(getStudentsRequest(page, per_page, search));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Remover aluno',
        message: `Aluno excluido com sucesso`,
      })
    );
  } catch (error) {
    yield put(failure());
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Remover aluno',
        message: `Ocorreu um erro ao remover o aluno - ${error.response.data.error}`,
      })
    );
  }
}

export default all([
  takeLatest('@students/GET_LIST_REQUEST', getStudents),
  takeLatest('@students/CREATE_STUDENTS_REQUEST', createStudent),
  takeLatest('@students/GET_STUDENT_DETAILS_REQUEST', getStudentDetails),
  takeLatest('@students/EDIT_STUDENT_REQUEST', editStudent),
  takeLatest('@students/DELETE_STUDENT_REQUEST', deleteStudent),
  takeLatest('@students/GET_STUDENTS_SELECT_REQUEST', getStudentsSelect),
]);
