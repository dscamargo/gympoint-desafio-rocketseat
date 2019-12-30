import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import history from '~/services/history';
import { store } from '~/store';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(config => {
  const { token } = store.getState().auth;

  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers: { ...headers } };
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      toastr.info(
        'Sessão expirada',
        'Sua sessão expirou, faça login novamente.'
      );
      history.push('/signout');
    }

    return Promise.reject(error);
  }
);

export default api;
