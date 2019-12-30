import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  align-items: center;

  > h1 {
    width: 50%;
    font-size: 24px;
    justify-content: flex-start;
    margin: 0;
    font-weight: 600;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  width: 40%;
  justify-content: flex-end;

  > div {
    width: 50%;
  }

  > input {
    margin-left: 20px;
    width: 70%;
    border-radius: 4px;
    border: #ddd;
    padding: 10px;
  }
`;
