import React from 'react';
import Select from 'react-select';

import { Container, RequiredLabel } from './styles';

function MySelect({
  placeholder,
  label,
  options,
  value,
  onChange,
  required,
  size,
  handleInputChange,
  loading,
  selectedValue,
  ...props
}) {
  return (
    <Container required={required} size={size}>
      <label htmlFor="select">
        <span>{label}</span>
        <Select
          id="select"
          options={options}
          selected={value}
          onChange={onChange}
          noOptionsMessage={() => <div>Sem opções</div>}
          placeholder={placeholder}
          onInputChange={handleInputChange}
          isLoading={loading}
          loadingMessage={() => <div>Carregando...</div>}
          defaultValue={selectedValue}
          {...props}
        />
      </label>
      {required && <RequiredLabel>* Campo obrigatório</RequiredLabel>}
    </Container>
  );
}

export default MySelect;
