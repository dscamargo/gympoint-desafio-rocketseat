import styled from 'styled-components';

import { branco } from '~/styles/colors';

export const Container = styled.div`
  width: ${props => (props.size ? props.size : 900)}px;
  height: auto;
  padding: 30px;
  background: ${branco};
  border-radius: 4px;
`;
