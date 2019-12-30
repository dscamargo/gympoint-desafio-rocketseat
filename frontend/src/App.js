import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';

import '~/config/reactotronConfig';

import { store, persistor } from '~/store';
import history from '~/services/history';

import Routes from '~/routes';

import GlobalStyle from '~/styles/global';

export default function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Routes />
            <GlobalStyle />
            <ReduxToastr
              timeOut={4000}
              preventDuplicates
              attention
              newestOnTop
              position="top-center"
              transitionIn="bounceIn"
              transitionOut="fadeOut"
              showCloseButton
              progressBar
              closeOnToastrClick
            />
          </Router>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}
