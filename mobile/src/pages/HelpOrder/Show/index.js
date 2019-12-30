import React from 'react';
import {formatDistanceToNow, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Header from '~/components/Header';

import {
  Container,
  Content,
  QuestionContainer,
  QuestionHeader,
  Title,
  Date,
  Question,
  AnswerContainer,
} from './styles';

function Show({navigation}) {
  const question = navigation.getParam('question');

  return (
    <Container>
      <Header showBackButton navigation={navigation} />
      <Content>
        <QuestionContainer>
          <QuestionHeader>
            <Title>PERGUNTA</Title>
            <Date>
              {formatDistanceToNow(parseISO(question.createdAt), {
                locale: pt,
              })}
            </Date>
          </QuestionHeader>
          <Question>{question.question}</Question>
          {question.answer && (
            <AnswerContainer>
              <QuestionHeader>
                <Title>RESPOSTA</Title>
              </QuestionHeader>
              <Question>{question.answer}</Question>
            </AnswerContainer>
          )}
        </QuestionContainer>
      </Content>
    </Container>
  );
}

export default Show;
