import styled from 'styled-components';
import { vermelho, branco, cinzaBordas } from '~/styles/colors';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${vermelho};
  display: flex;
  justify-content: center;
  align-items: center;

  > form {
    width: 360px;
    height: auto;
    background: ${branco};
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 50px 30px;

    > img {
      width: 153px;
      height: 100px;
      margin-bottom: 30px;
    }

    > label {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 20px;

      > span {
        color: #444;
        font-weight: 600;
      }

      > input {
        width: 100%;
        height: 45px;
        border-radius: 4px;
        border: 1px solid ${cinzaBordas};
        padding: 15px;
      }
    }
  }
`;
