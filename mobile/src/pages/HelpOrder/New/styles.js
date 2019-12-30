import styled from 'styled-components/native';

import {cinzaBordas, branco} from '~/styles/colors';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Content = styled.View`
  width: 100%;
  padding: 20px;
`;

export const InputContainer = styled.View`
  width: 100%;
  padding: 7px;
  border-color: ${cinzaBordas};
  border-width: 1px;
  background: ${branco};
  border-radius: 4px;
`;
