import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import { Container, RequiredLabel } from './styles';

function Input({
  required,
  label,
  disabled,
  margin,
  size,
  placeholder,
  type,
  name,
  id,
  value,
  onChange,
  ...props
}) {
  return (
    <Container
      disabled={disabled}
      required={required}
      margin={margin}
      size={size}
    >
      <label htmlFor={id}>
        <span>{label}</span>
        <NumberFormat
          {...props}
          value={value}
          suffix=" anos"
          type="text"
          displayType="input"
          decimalScale={0}
          allowNegative={false}
          onValueChange={e => onChange(e.value)}
        />
      </label>
      {required && <RequiredLabel>* Campo obrigatório</RequiredLabel>}
    </Container>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string.isRequired,
};

Input.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  value: '',
  onChange: () => {},
  required: false,
  disabled: false,
};

export default Input;
