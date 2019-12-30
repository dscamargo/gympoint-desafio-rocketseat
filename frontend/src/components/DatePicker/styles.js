import styled from 'styled-components';
import { vermelho, cinzaBordas, branco } from '~/styles/colors';

export const Container = styled.div`
  width: ${props => props.size};
  margin: ${props => props.margin};

  > label {
    display: flex;
    flex-direction: column;

    > span {
      font-size: 14px;
      font-weight: 600;
      color: ${props => (props.required ? vermelho : '#444')};
      text-transform: uppercase;
    }

    input {
      height: 40px;
      border-radius: 4px;
      padding: 10px;
      background: ${props => (props.disabled ? '#ddd' : branco)};
      border: ${props =>
        props.required ? `1px solid ${vermelho}` : `1px solid ${cinzaBordas}`};
    }
  }
`;

export const RequiredLabel = styled.div`
  font-size: 12px;
  color: ${vermelho};
`;
