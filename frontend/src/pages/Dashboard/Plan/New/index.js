import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createPlanRequest } from '~/store/modules/plans/actions';

import history from '~/services/history';

import Input from '~/components/Input';
import MoneyInput from '~/components/MoneyInput';
import FormHeader from '~/components/FormHeader';
import FormBoard from '~/components/FormBoard';
import { Container, LinhaInputs } from './styles';

export default function() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const [duration, setDuration] = useState('');

  const [titleRequired, setTitleRequired] = useState(false);
  const [priceRequired, setPriceRequired] = useState(false);
  const [durationRequired, setDurationRequired] = useState(false);
  useEffect(() => {
    setTotal(Number(Number(price) * Number(duration)));
  }, [price, duration]);
  function handleSubmit() {
    if (!title || !duration || !price) {
      if (!title) {
        setTitleRequired(true);
      }
      if (!duration) {
        setDurationRequired(true);
      }
      if (!price) {
        setPriceRequired(true);
      }
      return;
    }

    const data = {
      title,
      price,
      duration,
    };

    dispatch(createPlanRequest(data));
  }
  function handleCancel() {
    history.goBack();
  }

  function handleSetPrice(e) {
    setPrice(e);
  }

  return (
    <Container>
      <FormHeader
        title="Cadastro de plano"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <FormBoard>
        <Input
          required={titleRequired && !title}
          label="Titulo do plano"
          size="100%"
          type="text"
          id="plano-titulo"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <LinhaInputs>
          <Input
            required={durationRequired && !duration}
            label="Duração"
            size="32%"
            type="number"
            id="duration"
            value={duration}
            maxLength="2"
            onChange={e => setDuration(Number(e.target.value))}
          />
          <MoneyInput
            required={priceRequired && !price}
            label="Preço mensal"
            size="32%"
            type="text"
            id="price"
            value={price}
            onChange={handleSetPrice}
          />
          <MoneyInput
            disabled
            label="Preço total"
            size="32%"
            type="text"
            id="total"
            value={total}
          />
        </LinhaInputs>
      </FormBoard>
    </Container>
  );
}
