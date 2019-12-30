import React from 'react';
import {ActivityIndicator} from 'react-native';

import {Container, ButtonText} from './styles';
import {branco} from '~/styles/colors';

export default function Button({loading, onPress, label}) {
  return (
    <Container onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={branco} />
      ) : (
        <ButtonText>{label}</ButtonText>
      )}
    </Container>
  );
}
