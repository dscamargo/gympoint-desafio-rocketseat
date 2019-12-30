import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function FormBoard({ children, size }) {
  return <Container size={size}>{children}</Container>;
}

FormBoard.propTypes = {
  size: PropTypes.number,
};

FormBoard.defaultProps = {
  size: 900,
};

export default FormBoard;
