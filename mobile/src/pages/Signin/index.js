import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Alert, Platform} from 'react-native';

import Logo from '~/assets/images/logo.png';

import CheckinsActions from '~/store/ducks/checkins';

import {Container, Form, SigninInput} from './styles';
import Button from '~/components/Button';

const {checkinsListRequest} = CheckinsActions;

function Main({navigation}) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.checkins.loading);

  const [user, setUser] = useState('');

  function handleSubmit() {
    if (!user) {
      Alert.alert('Informe seu ID de cadastro');
      return;
    }
    dispatch(
      checkinsListRequest({
        id: user,
        page: 1,
        onSubmit: () => navigation.navigate('App'),
      }),
    );
  }
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Form>
        <Image source={Logo} />
        <SigninInput
          autoCapitalize={'none'}
          placeholder={'Informe seu ID de cadastro'}
          placeholderTextColor={'#999'}
          onChangeText={text => setUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <Button
          loading={loading}
          onPress={handleSubmit}
          label="Entrar no sistema"
        />
      </Form>
    </Container>
  );
}

export default Main;
