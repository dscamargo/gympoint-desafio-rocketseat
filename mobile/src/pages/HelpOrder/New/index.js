import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput, Platform} from 'react-native';

import Header from '~/components/Header';
import Button from '~/components/Button';

import OrdersActions from '~/store/ducks/orders';

import {Container, Content, InputContainer} from './styles';

const {ordersCreateRequest} = OrdersActions;

export default function New({navigation}) {
  const setPage = navigation.getParam('setPage');
  const dispatch = useDispatch();
  const [helpOrder, setHelpOrder] = useState('');

  const user_id = useSelector(state => state.me.user_id);
  const loading = useSelector(state => state.orders.loading);

  function handleSubmit() {
    dispatch(
      ordersCreateRequest({
        id: user_id,
        question: helpOrder,
        setPage,
        onSubmit: () => navigation.goBack(),
      }),
    );
  }
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Header showBackButton navigation={navigation} />
      <Content>
        <InputContainer>
          <TextInput
            multiline
            numberOfLines={15}
            value={helpOrder}
            onChangeText={text => setHelpOrder(text)}
            placeholder={'Inclua seu pedido de auxílio'}
            style={{textAlignVertical: 'top', minHeight: 100}}
          />
        </InputContainer>
        <Button
          loading={loading}
          onPress={handleSubmit}
          label="Enviar pedido"
        />
      </Content>
    </Container>
  );
}
