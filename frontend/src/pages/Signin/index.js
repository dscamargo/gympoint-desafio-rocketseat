import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import SubmitButton from '~/components/SubmitButton';

import Logo from '~/assets/images/logo.svg';

import { Container } from './styles';

export default function Signin() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Gympoint - Login';
  }, []);

  function handleSubmit(e) {
    if (email && password) {
      e.preventDefault();
      dispatch(signInRequest(email, password));
    }
  }

  return (
    <Container>
      <form>
        <img src={Logo} alt="logo" />
        <label htmlFor="email">
          <span>SEU EMAIL</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="exemplo@email.com.br"
          />
        </label>
        <label htmlFor="password">
          <span>SUA SENHA</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha"
            minLength={6}
          />
        </label>

        <SubmitButton
          onClick={handleSubmit}
          label="Entrar no sistema"
          type="button"
          loading={loading}
        />
      </form>
    </Container>
  );
}
