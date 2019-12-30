import React from 'react';
import {StatusBar} from 'react-native';

import '~/config/ReactotronConfig';

import {Provider} from 'react-redux';
import store from './store';

import Routes from '~/routes';

const App = () => (
  <Provider store={store}>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <Routes />
  </Provider>
);

export default App;
