import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';

import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function Signout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);
  return (
    <Container>
      <Spin />
    </Container>
  );
}
