import produce from 'immer';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

const INITIAL_STATE = {
  registers: [],
  registerDetails: {},
  loading: false,
  page: 1,
  per_page: 10,
  total: 0,
};

export default function initFunction(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@registers/SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@registers/FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@registers/GET_LIST_REQUEST':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@registers/GET_LIST_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
        draft.total = action.payload.data.meta.total;

        const reg = [];

        action.payload.data.data.forEach(register => {
          reg.push({
            ...register,
            start_date: format(
              parseISO(register.start_date),
              "dd 'de' MMMM 'de' yyyy",
              {
                locale: pt,
              }
            ),
            end_date: format(
              parseISO(register.end_date),
              "dd 'de' MMMM 'de' yyyy",
              {
                locale: pt,
              }
            ),
            active: register.active ? 'Sim' : 'Não',
          });
        });

        draft.registers = reg;
      });

    case '@registers/SET_PAGE':
      return produce(state, draft => {
        draft.loading = false;
        draft.page = action.payload.data;
      });
    case '@registers/SET_PER_PAGE':
      return produce(state, draft => {
        draft.loading = false;
        draft.per_page = action.payload.data;
      });
    case '@registers/CREATE_REGISTER_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@registers/CREATE_REGISTER_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@registers/REMOVE_REGISTER_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@registers/REMOVE_REGISTER_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@registers/GET_REGISTER_DETAILS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@registers/GET_REGISTER_DETAILS_SUCCESS':
      return produce(state, draft => {
        const student = {
          ...action.payload.data.student,
          label: action.payload.data.student.name,
          value: action.payload.data.student.id,
        };
        const plan = {
          ...action.payload.data.plan,
          label: action.payload.data.plan.title,
          value: action.payload.data.plan.id,
        };
        draft.loading = false;
        draft.registerDetails = { ...action.payload.data, plan, student };
      });
    case '@registers/EDIT_REGISTER_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@registers/EDIT_REGISTER_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
