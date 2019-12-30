import styled from 'styled-components/native';

import {vermelho, branco} from '~/styles/colors';

export const Container = styled.TouchableOpacity`
  width: 100%;
  background: ${vermelho};
  height: 45px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

export const ButtonText = styled.Text`
  color: ${branco};
  font-size: 16px;
  font-weight: 600;
`;
