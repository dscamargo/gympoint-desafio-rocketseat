import React from 'react';
import PropTypes from 'prop-types';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

import SubmitButton from '~/components/SubmitButton';
import CancelButton from '~/components/Button';
import { Container, ButtonsContainer } from './styles';

function FormHeader({ title, onSubmit, onCancel, hideButtons }) {
  return (
    <Container>
      <h1>{title}</h1>

      {hideButtons ? (
        <div />
      ) : (
        <ButtonsContainer>
          <div style={{ width: 120 }}>
            <CancelButton
              onClick={onCancel}
              type="button"
              icon={faChevronLeft}
              label="VOLTAR"
            />
          </div>
          <div style={{ width: 120 }}>
            <SubmitButton
              onClick={onSubmit}
              type="button"
              icon={faCheck}
              label="SALVAR"
            />
          </div>
        </ButtonsContainer>
      )}
    </Container>
  );
}

FormHeader.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  hideButtons: PropTypes.bool,
};

FormHeader.defaultProps = {
  title: '',
  onSubmit: () => {},
  onCancel: () => {},
  hideButtons: false,
};

export default FormHeader;
