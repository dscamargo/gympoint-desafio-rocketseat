import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import history from '~/services/history';

import {
  getRegistersRequest,
  setPage,
  setPerPage,
  removeRegisterRequest,
} from '~/store/modules/registers/actions';

import ListHeader from '~/components/ListHeader';
import Table from '~/components/Table';

import { Container } from './styles';

export default function List() {
  const dispatch = useDispatch();

  const { page, per_page, loading, total, registers } = useSelector(
    state => state.registers
  );
  const columns = ['Aluno', 'Plano', 'Início', 'Término', 'Ativa'];

  useEffect(() => {
    dispatch(getRegistersRequest(page, per_page));
  }, [dispatch, page, per_page]);

  function handleNewRegister() {
    history.push('/dashboard/registers/new');
  }
  function handleEdit(id) {
    history.push(`/dashboard/registers/${id}/edit`);
  }

  function handleDelete({ student: { name }, id }) {
    const confirmation = window.confirm(
      `Deseja remover a matrícula de "${name}" ?`
    );

    if (confirmation) {
      dispatch(removeRegisterRequest(id));
    }
  }
  return (
    <Container>
      <ListHeader
        title="Gerenciando matrículas"
        handleNewRegister={handleNewRegister}
      />

      <Table
        setPage={setPage}
        setPerPage={setPerPage}
        loading={loading}
        type="registers"
        columns={columns}
        page={page}
        data={registers}
        totalPages={total}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Container>
  );
}
