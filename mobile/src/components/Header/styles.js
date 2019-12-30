import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {branco} from '~/styles/colors';

export const Container = styled.View`
  width: 100%;
  padding-top: ${getStatusBarHeight() + 10}px;
  padding-bottom: 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom-color: #ddd;
  border-bottom-width: 1;
  background: ${branco};
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding-left: 20px;
  width: 65%;
  justify-content: space-between;
`;
