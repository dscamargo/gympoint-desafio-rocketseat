import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPlansRequest,
  setPage,
  setPerPage,
  deletePlanRequest,
} from '~/store/modules/plans/actions';

import history from '~/services/history';
import ListHeader from '~/components/ListHeader';
import Table from '~/components/Table';
import { Container } from './styles';

export default function List() {
  const dispatch = useDispatch();
  const columns = ['Titulo', 'Duração', 'Valor p/ mês'];

  const plans = useSelector(
    state => state.plans.plans && state.plans.plans.data
  );
  const loading = useSelector(state => state.plans.loading);
  const page = useSelector(state => state.plans.page);
  const per_page = useSelector(state => state.plans.per_page);
  const total = useSelector(
    state =>
      state.plans &&
      state.plans.plans &&
      state.plans.plans.meta &&
      state.plans.plans.meta.total
  );

  useEffect(() => {
    dispatch(getPlansRequest(page, per_page));
  }, [dispatch, page, per_page]);

  useEffect(() => {
    window.document.title = 'Gympoint - Planos';
  }, []);

  function handleNewPlan() {
    history.push('/dashboard/plans/new');
  }

  function handleEdit(id) {
    history.push(`/dashboard/plans/${id}/edit`);
  }
  function handleRemove(item) {
    const confirmation = window.confirm(
      `Deseja remover o plano "${item.title}" ?`
    );

    if (confirmation) {
      dispatch(deletePlanRequest(item.id));
    }
  }

  return (
    <Container>
      <ListHeader
        title="Gerenciando planos"
        handleNewRegister={handleNewPlan}
      />
      <Table
        type="plans"
        data={plans}
        setPage={setPage}
        setPerPage={setPerPage}
        page={page}
        columns={columns}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleRemove}
        totalPages={total}
      />
    </Container>
  );
}
