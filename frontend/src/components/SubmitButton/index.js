import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spin, Icon } from 'antd';

import { Container } from './styles';

function SubmitButton({ loading, icon, iconColor, label, onClick, type }) {
  const loadingIcon = (
    <Icon type="loading" style={{ fontSize: 24, color: '#fff' }} spin />
  );
  return (
    <Container onClick={onClick} type={type}>
      {!loading && (
        <>
          {icon && <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />}
          <span>{label}</span>
        </>
      )}
      {loading && <Spin indicator={loadingIcon} />}
    </Container>
  );
}

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  iconColor: PropTypes.string,
  loading: PropTypes.bool,
};

SubmitButton.defaultProps = {
  type: 'button',
  iconColor: '#fff',
  onClick: () => {},
  loading: false,
};

export default SubmitButton;
