import styled from 'styled-components';

import { vermelho } from '~/styles/colors';

export const Container = styled.div`
  width: ${props => props.size};
  margin: ${props => props.margin};

  > label {
    display: flex;
    flex-direction: column;

    > div {
      > div {
        border: 1px solid
          ${props => (props.required ? vermelho : 'hsl(0,0%,80%)')};
      }
    }

    > span {
      font-size: 14px;
      font-weight: 600;
      color: ${props => (props.required ? vermelho : '#444')};
      text-transform: uppercase;
    }
  }
`;

export const RequiredLabel = styled.div`
  font-size: 12px;
  color: ${vermelho};
`;
