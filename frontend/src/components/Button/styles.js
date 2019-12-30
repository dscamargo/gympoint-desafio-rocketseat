import styled from 'styled-components';

import { branco } from '~/styles/colors';

export const Container = styled.button`
  height: 45px;
  background: #ccc;
  border-radius: 4px;
  width: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  > svg {
    margin-right: 20px;
  }

  > span {
    color: ${branco};
    font-weight: 600;
  }
`;
