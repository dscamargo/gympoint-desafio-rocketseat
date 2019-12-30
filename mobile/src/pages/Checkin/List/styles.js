import styled from 'styled-components/native';

import {corFundo, branco, cinzaBordas} from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  background: ${corFundo};
`;

export const Content = styled.View`
  padding: 0px 20px;
  flex: 1;
`;

export const ListContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  flex: 1;
`;

export const ListContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${cinzaBordas};
  border-width: 1px;
  padding: 20px;
  border-radius: 8px;
  background: ${branco};
  margin-bottom: 10px;
`;

export const CheckinNumber = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: #444;
`;

export const CheckinDate = styled.Text`
  color: #666;
  font-size: 14px;
`;
