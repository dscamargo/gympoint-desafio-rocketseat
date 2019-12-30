import React from 'react';
import PropTypes from 'prop-types';

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
        <input
          disabled={disabled}
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
      {required && <RequiredLabel>* Campo obrigatório</RequiredLabel>}
    </Container>
  );
}

Input.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  required: false,
  name: '',
  disabled: false,
  margin: '',
  label: '',
  placeholder: '',
  type: 'text',
  value: '',
  onChange: () => {},
};

export default Input;
