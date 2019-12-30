import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, ContentGeral, Content } from './styles';

function Modal({ width, children, isOpen, close }) {
  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        close();
      }
    });

    return () =>
      document.removeEventListener('keydown', e => {
        if (e.key === 'Escape') {
          close();
        }
      });
  }, [close]);
  let podeFechar = false;
  if (isOpen) {
    return (
      <Container
        onClick={() => {
          if (podeFechar) {
            close();
          }

          podeFechar = true;
        }}
      >
        <ContentGeral>
          <Content
            onClick={() => {
              podeFechar = false;
            }}
            size={{ width }}
          >
            {children}
          </Content>
        </ContentGeral>
      </Container>
    );
  }
  return <div />;
}

Modal.propTypes = {
  width: PropTypes.number,
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

Modal.defaultProps = {
  width: 500,
  isOpen: false,
  close: () => {},
};

export default Modal;
