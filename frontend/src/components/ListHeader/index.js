import React from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import SubmitButton from '~/components/SubmitButton';
import { Container, ActionsContainer } from './styles';

function ListHeader({
  haveSearch,
  searchValue,
  handleNewRegister,
  handleSearch,
  title,
}) {
  return (
    <Container>
      <h1>{title}</h1>

      <ActionsContainer>
        <div>
          <SubmitButton
            onClick={handleNewRegister}
            label="CADASTRAR"
            icon={faPlus}
          />
        </div>
        {haveSearch && (
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Buscar"
          />
        )}
      </ActionsContainer>
    </Container>
  );
}

ListHeader.propTypes = {
  haveSearch: PropTypes.bool,
  searchValue: PropTypes.string,
  handleNewRegister: PropTypes.func,
  handleSearch: PropTypes.func,
  title: PropTypes.string,
};

ListHeader.defaultProps = {
  haveSearch: false,
  searchValue: '',
  handleNewRegister: () => {},
  handleSearch: () => {},
  title: '',
};

export default ListHeader;
