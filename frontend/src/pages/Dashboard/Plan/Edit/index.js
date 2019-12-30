import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import history from '~/services/history';

import {
  getPlanDetailsRequest,
  editPlanRequest,
} from '~/store/modules/plans/actions';

import FormHeader from '~/components/FormHeader';
import FormBoard from '~/components/FormBoard';
import Input from '~/components/Input';

import { Container, LinhaInputs } from './styles';

export default function Edit({ match }) {
  const dispatch = useDispatch();

  const details = useSelector(state => state.plans.planDetails);

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const [titleRequired, setTitleRequired] = useState(false);
  const [priceRequired, setPriceRequired] = useState(false);
  const [durationRequired, setDurationRequired] = useState(false);

  const priceFormatted = useMemo(() => {
    if (price) {
      if (String(price).includes('R$')) {
        let value = String(price).split('R$')[1];
        value = value.trim();
        value = value.replace(',', '.');
        return value;
      }
      return price;
    }
  }, [price]);

  const total = useMemo(() => {
    return Number(priceFormatted) * Number(duration);
  }, [priceFormatted, duration]);

  useEffect(() => {
    dispatch(getPlanDetailsRequest(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (details) {
      setTitle(details && details.title && details.title);
      setDuration(details && details.duration && Number(details.duration));
      setPrice(details && details.price && Number(details.price));
    }
  }, [details]);

  function handleCancel() {
    history.goBack();
  }
  function handleEdit() {
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
      duration,
      price: Number(priceFormatted),
    };

    const { id } = match.params;

    dispatch(editPlanRequest({ id, ...data }));
  }

  return (
    <Container>
      <FormHeader
        title="Edição de plano"
        onSubmit={handleEdit}
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
            type="text"
            id="duration"
            value={duration}
            onChange={e => setDuration(e.target.value)}
          />
          <Input
            required={priceRequired && !price}
            label="Preço mensal"
            size="32%"
            type="text"
            id="price"
            value={
              price &&
              price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            }
            onChange={e => setPrice(e.target.value)}
          />
          <Input
            disabled
            label="Preço Total"
            size="32%"
            type="text"
            id="total"
            value={
              total &&
              total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            }
          />
        </LinhaInputs>
      </FormBoard>
    </Container>
  );
}
