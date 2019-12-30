import styled from 'styled-components';

import { vermelho } from '~/styles/colors';

export const Container = styled.div`
  > textarea {
    width: 100%;
    padding: 10px 10px;
    border: ${props =>
      props.required
        ? `1px solid ${vermelho}`
        : props.isFocused && `1px solid blue`};
    border-radius: 4px;
  }
`;

export const RequiredLabel = styled.div`
  font-size: 12px;
  color: ${vermelho};
`;
