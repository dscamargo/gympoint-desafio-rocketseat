import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '~/components/Modal';
import Button from '~/components/SubmitButton';
import Textarea from '~/components/Textarea';

import { updateHelpOrderRequest } from '~/store/modules/orders/actions';

import {
  ModalContent,
  QuestionTitle,
  QuestionContainer,
  Question,
  AnswerTitle,
  AnswerContainer,
} from './styles';

export default function AnswerModal({ close, isOpen }) {
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState('');
  const [answerRequired, setAnswerRequired] = useState(false);

  const orderDetails = useSelector(state => state.orders.orderDetails);
  const loading = useSelector(state => state.orders.loading);

  function handleAnswer() {
    if (!answer) {
      setAnswerRequired(true);
      return;
    }

    const data = {
      id: orderDetails.id,
      answer,
    };

    dispatch(updateHelpOrderRequest(data));
    setAnswer('');
  }

  function handleClose() {
    setAnswer('');
    setAnswerRequired(false);
    close();
  }

  return (
    <Modal close={handleClose} isOpen={isOpen}>
      <ModalContent>
        <QuestionTitle>PERGUNTA DO ALUNO</QuestionTitle>
        <QuestionContainer>
          <Question>{orderDetails && orderDetails.question}</Question>
        </QuestionContainer>

        <AnswerTitle>SUA RESPOSTA</AnswerTitle>
        <AnswerContainer>
          <Textarea
            placeholder="Sua pergunta..."
            value={answer}
            onChange={setAnswer}
            required={answerRequired && !answer}
          />
        </AnswerContainer>

        <Button
          onClick={handleAnswer}
          loading={loading}
          type="button"
          label="Responder aluno"
        />
      </ModalContent>
    </Modal>
  );
}
