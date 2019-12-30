import {createReducer, createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  meSetUserId: ['data'],
});

export const MeTypes = Types;
export default Creators;

const INITIAL_STATE = {
  user_id: null,
};

export const setUserId = (state, {data}) => ({
  ...state,
  user_id: data,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ME_SET_USER_ID]: setUserId,
});
