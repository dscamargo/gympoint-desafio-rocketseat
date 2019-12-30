import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  margin-top: 20px;
  border-radius: 4px;
  padding: 30px;
  display: flex;
  flex-direction: column;

  table {
    width: 100%;

    th {
      text-transform: uppercase;
      text-align: left;
    }

    td {
      padding: 15px 0;
      border-bottom: 1px solid #eeeeee;

      button {
        border: none;
        margin-right: 10px;
        background: transparent;
        font-size: 15px;

        :last-of-type {
          margin-right: 0;
          color: #de3b3b;
        }

        :first-of-type {
          color: #4d85ee;
        }
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const SpinContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 200px 100px;
`;
