import produce from 'immer';

import history from '~/services/history';

const INITIAL_STATE = {
  token: null,
  user: {},
  loading: false,
  signed: false,
  error: false,
};

export default function initFunction(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST':
      return produce(state, draft => {
        draft.signed = false;
        draft.loading = true;
        draft.error = false;
      });
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.data.token;
        draft.user = action.payload.data.user;
        draft.signed = true;
        draft.loading = false;
        draft.error = false;
      });
    case '@auth/SIGN_FAILURE':
      return produce(state, draft => {
        draft.signed = false;
        draft.loading = false;
        draft.error = true;
      });
    case '@auth/SIGN_OUT':
      return produce(state, draft => {
        draft.signed = false;
        draft.token = null;
        draft.user = {};
        draft.loading = false;

        history.push('/signin');
      });
    default:
      return state;
  }
}
