import React from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import Loading from '~/components/Loading';
import { Container, PaginationContainer, SpinContainer } from './styles';

function Table({
  type,
  setPage,
  setPerPage,
  page,
  totalPages,
  columns,
  data,
  loading,
  handleEdit,
  handleDelete,
}) {
  const dispatch = useDispatch();

  function onShowSizeChange(current, pageSize) {
    dispatch(setPage(1));
    dispatch(setPerPage(pageSize));
  }

  function handePageChange(page) {
    dispatch(setPage(page));
  }

  return (
    <Container>
      {loading && (
        <SpinContainer>
          <Loading />
        </SpinContainer>
      )}
      {!loading && (
        <table cellSpacing="0">
          <thead>
            <tr>
              {columns && columns.map(column => <th key={column}>{column}</th>)}
              <th />
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map(item => (
                <tr key={item.id}>
                  {type === 'students' && (
                    <>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.age} anos</td>
                    </>
                  )}
                  {type === 'plans' && (
                    <>
                      <td>{item.title}</td>
                      <td>{item.duration} meses</td>
                      <td>
                        {item.price &&
                          item.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                      </td>
                    </>
                  )}
                  {type === 'registers' && (
                    <>
                      <td>{item.student && item.student.name}</td>
                      <td>{item.plan && item.plan.title}</td>
                      <td>{item.start_date}</td>
                      <td>{item.end_date}</td>
                      <td>{item.active}</td>
                    </>
                  )}

                  <td>
                    <button onClick={() => handleEdit(item.id)} type="button">
                      editar
                    </button>
                    <button onClick={() => handleDelete(item)} type="button">
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <PaginationContainer>
        <Pagination
          disabled={loading}
          pageSizeOptions={['10', '25', '50']}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={handePageChange}
          defaultCurrent={page}
          total={totalPages}
        />
      </PaginationContainer>
    </Container>
  );
}

Table.propTypes = {
  type: PropTypes.string,
  setPage: PropTypes.func,
  setPerPage: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape),
  data: PropTypes.arrayOf(PropTypes.shape),
  loading: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
Table.defaultProps = {
  type: '',
  setPage: () => {},
  setPerPage: () => {},
  page: 1,
  perPage: 10,
  columns: [],
  data: [],
  loading: false,
  handleEdit: () => {},
  handleDelete: () => {},
};

export default Table;
