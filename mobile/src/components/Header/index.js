import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import HeaderLogo from '~/assets/images/Header.png';

import {Container, Content} from './styles';

export default function Header({showBackButton, navigation}) {
  return (
    <Container>
      <Content>
        {showBackButton ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-thin-left" size={18} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Image source={HeaderLogo} onPress />
        </TouchableOpacity>
      </Content>
    </Container>
  );
}
