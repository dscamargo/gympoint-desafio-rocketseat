import styled from 'styled-components';

import { branco } from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 64px;
  background: ${branco};
  padding: 5px 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > img {
    width: 135px;
    height: 24px;
  }
`;

export const Content = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Separator = styled.div`
  width: 1px;
  height: 70%;
  background: #ddd;
  margin: 0 50px;
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Item = styled.span`
  padding: 20px;
  color: ${props => (props.active ? `#444` : '#999')};
  font-size: 15px;
  font-weight: 600;
  transition: 0.2s;

  :hover {
    color: #444;
    cursor: pointer;
  }
`;

export const LogoutArea = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 15%;

  > span {
    color: #666;
    font-weight: 600;
  }

  > button {
    border: none;
    background: transparent;
    color: #de3b3b;
    margin-bottom: 5px;
  }
`;
