import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import FormHeader from '~/components/FormHeader';
import FormBoard from '~/components/FormBoard';
import AnswerModal from '~/components/AnswerModal';

import {
  getHelpOrdersRequest,
  getHelpOrderDetailsRequest,
  setPage,
  setPerPage,
  setModalIsOpened,
} from '~/store/modules/orders/actions';

import {
  Container,
  Header,
  List,
  ListItem,
  AnswerButton,
  PaginationContainer,
} from './styles';

export default function HelpOrders() {
  const dispatch = useDispatch();

  const orders = useSelector(
    state => state.orders.orders && state.orders.orders.data
  );
  const total = useSelector(
    state =>
      state.orders.orders &&
      state.orders.orders.meta &&
      state.orders.orders.meta.total
  );
  const modalIsOpen = useSelector(state => state.orders.modalIsOpen);
  const page = useSelector(state => state.orders.page);
  const per_page = useSelector(state => state.orders.per_page);

  useEffect(() => {
    dispatch(getHelpOrdersRequest(page, per_page));
  }, [dispatch, page, per_page]);

  function handleOpenAnswerModal(id) {
    dispatch(getHelpOrderDetailsRequest(id));
    dispatch(setModalIsOpened(true));
  }

  function handleCloseModal() {
    dispatch(setModalIsOpened(false));
  }

  function onShowSizeChange(current, size) {
    dispatch(setPerPage(size));
  }

  function handlePageChange(page, pageSize) {
    dispatch(setPage(page));
  }

  return (
    <Container>
      <FormHeader hideButtons title="Pedidos de auxílio" />

      <FormBoard size={700}>
        <Header>
          <span>ALUNO</span>
        </Header>
        <List>
          {orders &&
            orders.map(order => (
              <ListItem key={order.id}>
                <span>{order.student.name}</span>
                <AnswerButton onClick={() => handleOpenAnswerModal(order.id)}>
                  responder
                </AnswerButton>
              </ListItem>
            ))}
        </List>
        <PaginationContainer>
          <Pagination
            showSizeChanger
            pageSize={per_page}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={page}
            total={total}
            onChange={handlePageChange}
            pageSizeOptions={['10', '25', '50']}
          />
        </PaginationContainer>
      </FormBoard>

      <AnswerModal isOpen={modalIsOpen} close={handleCloseModal} />
    </Container>
  );
}
