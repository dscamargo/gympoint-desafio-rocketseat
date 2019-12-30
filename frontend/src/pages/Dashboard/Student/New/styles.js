import styled from 'styled-components';

import { branco } from '~/styles/colors';

export const Container = styled.div`
  width: 900px;
  height: auto;
  margin: 0 auto;
`;

export const Content = styled.div`
  background: 100%;
  height: 100%;
  background: ${branco};
  border-radius: 4px;
  padding: 30px;
`;

export const LinhaInputs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
