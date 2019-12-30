import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {vermelho, branco, preto} from '~/styles/colors';

import Signin from '~/pages/Signin';

import CheckinList from '~/pages/Checkin/List';

import HelpOrdersList from '~/pages/HelpOrder/List';
import HelpOrdersNew from '~/pages/HelpOrder/New';
import HelpOrdersShow from '~/pages/HelpOrder/Show';

const Checkins = createSwitchNavigator({
  CheckinList,
});

const Help = createSwitchNavigator(
  {
    HelpOrdersList,
    HelpOrdersNew,
    HelpOrdersShow,
  },
  {
    backBehavior: 'history',
  },
);

const Routes = createAppContainer(
  createSwitchNavigator({
    Sign: createSwitchNavigator({
      Signin,
    }),
    App: createBottomTabNavigator(
      {
        'Check-ins': Checkins,
        'Pedir ajuda': Help,
      },
      {
        defaultNavigationOptions: ({navigation}) => ({
          tabBarIcon: () => {
            const {routeName} = navigation.state;
            let tabName;
            tabName =
              routeName === 'Pedir ajuda' ? 'help-outline' : 'location-on';
            return <Icon name={tabName} size={20} />;
          },
        }),
      },
      {
        tabBarOptions: {
          activeTintColor: vermelho,
          inactiveTintColor: preto,
          keyboardHidesTabBar: true,

          style: {
            background: branco,
          },
        },
      },
    ),
  }),
);

export default Routes;
