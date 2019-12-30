import styled from 'styled-components/native';

import {branco, cinzaTexto, preto, cinzaBordas} from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const QuestionContainer = styled.View`
  background: ${branco};
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  border-color: ${cinzaBordas};
  border-width: 1px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const QuestionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  color: ${preto};
  font-size: 16px;
  font-weight: 700;
`;

export const Date = styled.Text`
  color: ${cinzaTexto};
`;

export const Question = styled.Text`
  flex-wrap: wrap;
  line-height: 25px;
  color: ${cinzaTexto};
`;

export const AnswerContainer = styled.View`
  margin-top: 50px;
`;
