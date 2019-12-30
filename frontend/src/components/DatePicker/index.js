import React from 'react';
import PropTypes from 'prop-types';
import Picker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import { Container, RequiredLabel } from './styles';

registerLocale('pt', pt);

function DatePicker({ required, label, size, value, onChange, ...props }) {
  return (
    <Container required={required} size={size}>
      <label htmlFor="picker">
        <span>{label}</span>
        <Picker
          {...props}
          dateFormat="dd/MM/yyyy"
          locale="pt"
          showPopperArrow={false}
          selected={value}
          onChange={onChange}
          todayButton="Hoje"
        />
      </label>
      {required && <RequiredLabel>* Campo obrigatório</RequiredLabel>}
    </Container>
  );
}

DatePicker.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  required: false,
  value: new Date(),
  label: '',
  size: '100%',
  onChange: () => {},
};

export default DatePicker;
