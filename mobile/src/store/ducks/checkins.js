import {createReducer, createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  checkinsListRequest: ['data'],
  checkinsListSuccess: ['data'],
  checkinsListFailure: null,

  checkinsNewRequest: ['data'],
  checkinsNewSuccess: null,
  checkinsNewFailure: null,
});

export const CheckinsTypes = Types;
export default Creators;

const INITIAL_STATE = {
  checkins: [],
  meta: {},
  loading: false,
};

export const success = state => ({
  ...state,
  loading: false,
});

export const request = state => ({
  ...state,
  loading: true,
});

export const failure = state => ({
  ...state,
  loading: false,
});

export const getCheckins = (state, {data}) => {
  return {
    ...state,
    meta: data.meta,
    checkins:
      Number(data.meta.page) === 1
        ? data.data
        : [...state.checkins, ...data.data],
    loading: false,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECKINS_LIST_REQUEST]: request,
  [Types.CHECKINS_LIST_SUCCESS]: getCheckins,
  [Types.CHECKINS_LIST_FAILURE]: failure,

  [Types.CHECKINS_NEW_REQUEST]: request,
  [Types.CHECKINS_NEW_SUCCESS]: success,
  [Types.CHECKINS_NEW_FAILURE]: failure,
});
