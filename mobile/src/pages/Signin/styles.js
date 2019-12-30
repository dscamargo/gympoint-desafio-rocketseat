import styled from 'styled-components/native';

import {branco, cinzaBordas} from '~/styles/colors';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${branco};
`;

export const Form = styled.View`
  width: 85%;
  height: 205px;
  background: ${branco};
  align-items: center;
  justify-content: center;
`;

export const SigninInput = styled.TextInput`
  width: 100%;
  margin-top: 20px;
  height: 45px;
  border-radius: 4px;
  padding: 10px 20px;
  border: 1px solid ${cinzaBordas};
  color: #000;
`;
