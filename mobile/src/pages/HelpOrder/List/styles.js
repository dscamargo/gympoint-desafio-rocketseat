import styled from 'styled-components/native';

import {
  corFundo,
  cinzaBordas,
  verde,
  branco,
  cinzaTexto,
  preto,
} from '~/styles/colors';

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
  border-color: ${cinzaBordas};
  border-width: 1px;
  padding: 20px;
  border-radius: 8px;
  background: ${branco};
  margin-bottom: 10px;
`;

export const ItemHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ItemText = styled.Text`
  color: ${props => (props.answered ? verde : cinzaTexto)};
`;
export const ItemDate = styled.Text`
  color: ${preto};
`;
export const ItemQuestion = styled.Text`
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
