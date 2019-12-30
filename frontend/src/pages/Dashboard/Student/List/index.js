import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStudentsRequest,
  setPage,
  setPerPage,
  setSearch,
  deleteStudentRequest,
} from '~/store/modules/students/actions';

import history from '~/services/history';

import Table from '~/components/Table';
import ListHeader from '~/components/ListHeader';
import { Container } from './styles';

export default function StudentsList() {
  const dispatch = useDispatch();

  const students = useSelector(state => state.students.students.data);
  const page = useSelector(state => state.students.page);
  const per_page = useSelector(state => state.students.per_page);
  const total = useSelector(
    state =>
      state.students &&
      state.students.students &&
      state.students.students.meta &&
      state.students.students.meta.total
  );
  const loading = useSelector(state => state.students.loading);
  const searchStudent = useSelector(state => state.students.search);

  const [data, setData] = useState([]);

  const columns = ['Nome', 'E-mail', 'Idade'];

  useEffect(() => {
    dispatch(getStudentsRequest(page, per_page, searchStudent || ''));
  }, [dispatch, page, per_page, searchStudent]);

  useEffect(() => {
    setData(students);
  }, [students]);

  useEffect(() => {
    window.document.title = 'Gympoint - Alunos';
  }, []);

  function handleNewStudent() {
    history.push('/dashboard/students/new');
  }
  function handleEditStudent(id) {
    history.push(`/dashboard/students/${id}/edit`);
  }

  function handleDeleteStudent(item) {
    const confirmation = window.confirm(
      `Deseja remover o aluno "${item.name}" ?`
    );

    if (confirmation) {
      dispatch(deleteStudentRequest(item.id));
    }
  }

  return (
    <Container>
      <ListHeader
        title="Gerenciando alunos"
        haveSearch
        searchValue={searchStudent}
        handleSearch={e => dispatch(setSearch(e.target.value))}
        handleNewRegister={handleNewStudent}
      />
      <Table
        type="students"
        totalPages={total}
        page={page}
        setPage={setPage}
        setPerPage={setPerPage}
        columns={columns}
        data={data}
        loading={loading}
        handleEdit={handleEditStudent}
        handleDelete={handleDeleteStudent}
      />
    </Container>
  );
}
