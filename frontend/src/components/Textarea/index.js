import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, RequiredLabel } from './styles';

function Textarea({ required, value, onChange, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);
  function onFocus() {
    setIsFocused(true);
  }
  function onBlur() {
    setIsFocused(false);
  }
  return (
    <Container isFocused={isFocused} required={required}>
      <textarea
        placeholder={placeholder}
        autoCapitalize="sentences"
        wrap="hard"
        rows="5"
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {required && <RequiredLabel>* Campo obrigatório</RequiredLabel>}
    </Container>
  );
}

Textarea.propTypes = {
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
Textarea.defaultProps = {
  required: false,
  value: '',
  onChange: () => {},
  placeholder: '',
};

export default Textarea;
