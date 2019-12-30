import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import history from '~/services/history';

import Logo from '~/assets/images/header-logo.png';

import {
  Container,
  Content,
  Separator,
  Tabs,
  Item,
  LogoutArea,
} from './styles';

export default function Header() {
  const user = useSelector(state => state.auth.user);

  const [selected, setSelected] = useState('alunos');

  useEffect(() => {
    if (window.location.pathname.includes('students')) {
      setSelected('alunos');
    }
    if (window.location.pathname.includes('plans')) {
      setSelected('planos');
    }
    if (window.location.pathname.includes('registers')) {
      setSelected('matriculas');
    }
    if (window.location.pathname.includes('help-orders')) {
      setSelected('pedidos');
    }
  }, []);

  function setTab(tab, url) {
    history.push(url);
    setSelected(tab);
  }

  function handleLogout() {
    history.push('/signout');
  }

  return (
    <Container>
      <Content>
        <img src={Logo} alt="logo" />
        <Separator />
        <Tabs>
          <Item
            onClick={() => setTab('alunos', '/dashboard/students')}
            active={selected.includes('alunos')}
          >
            ALUNOS
          </Item>
          <Item
            onClick={() => setTab('planos', '/dashboard/plans')}
            active={selected.includes('planos')}
          >
            PLANOS
          </Item>
          <Item
            onClick={() => setTab('matricula', '/dashboard/registers')}
            active={selected.includes('matricula')}
          >
            MATRICULA
          </Item>
          <Item
            onClick={() => setTab('auxilio', '/dashboard/help-orders')}
            active={selected.includes('auxilio')}
          >
            PEDIDOS DE AUXILIO
          </Item>
        </Tabs>
      </Content>
      <LogoutArea>
        <span>{user && user.name}</span>
        <button onClick={handleLogout} type="button">
          sair do sistema
        </button>
      </LogoutArea>
    </Container>
  );
}
