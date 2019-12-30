import React from 'react';
import { Spin, Icon } from 'antd';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
    </Container>
  );
}
