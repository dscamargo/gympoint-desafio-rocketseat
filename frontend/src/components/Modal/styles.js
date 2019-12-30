import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;
  z-index: 10;
`;

export const Content = styled.div`
  position: relative;
  min-height: 70%;
  max-height: ${window.innerHeight * 0.95}px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  width: ${props => (props.size.width ? props.size.width : 500)}px;
  overflow: hidden;
  overflow-y: auto;
  scroll-padding-right: 20px;

  h1 {
    font-size: 26px;
    font-weight: 500;
    text-align: center;
    margin: 0 0 10px;
  }
`;

export const ContentGeral = styled.div`
  position: relative;
  min-height: 70%;
  max-height: ${window.innerHeight * 0.95}px;
`;
