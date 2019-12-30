import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {formatDistance} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/Feather';
import {verde} from '~/styles/colors';

import OrdersActions from '~/store/ducks/orders';

const {ordersGetRequest} = OrdersActions;

import Header from '~/components/Header';
import Button from '~/components/Button';

import {
  Container,
  Content,
  ListContainer,
  ListContent,
  ItemHeader,
  ItemText,
  ItemDate,
  ItemQuestion,
  TitleContainer,
} from './styles';

export default function List({navigation}) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const last_page = useSelector(
    state => state.orders.meta && state.orders.meta.last_page,
  );
  const loading = useSelector(state => state.orders.loading);
  const id = useSelector(state => state.me.user_id);
  const helpOrders = useSelector(
    state => state.orders.helpOrders && state.orders.helpOrders,
  );

  useEffect(() => {
    dispatch(
      ordersGetRequest({
        id,
        page,
      }),
    );
  }, [dispatch, id, page]);

  function handleOpenDetails(question) {
    navigation.navigate('HelpOrdersShow', {question});
  }

  function renderList(item) {
    return (
      <ListContent>
        <TouchableOpacity onPress={() => handleOpenDetails(item)}>
          <ItemHeader>
            <TitleContainer>
              {item.answer && (
                <View style={{marginRight: 5}}>
                  <Icon color={verde} name="check-circle" />
                </View>
              )}
              <ItemText answered={item.answer}>
                {item.answer ? 'Respondido' : 'Sem resposta'}
              </ItemText>
            </TitleContainer>
            <ItemDate>
              {formatDistance(new Date(item && item.createdAt), new Date(), {
                locale: pt,
              })}
            </ItemDate>
          </ItemHeader>
          <ItemQuestion numberOfLines={3}>{item.question}</ItemQuestion>
        </TouchableOpacity>
      </ListContent>
    );
  }

  function handleEndReached() {
    if (!last_page && !loading) {
      setPage(page + 1);
    }
  }

  function handleRefresh() {
    setPage(1);
    setRefreshing(true);
    dispatch(
      ordersGetRequest({
        id,
        page: 1,
      }),
    );
    setRefreshing(false);
  }

  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <Button
          onPress={() => navigation.navigate('HelpOrdersNew', {setPage})}
          label="Novo pedido de auxílio"
        />
        <ListContainer>
          <FlatList
            data={helpOrders}
            renderItem={({item}) => renderList(item)}
            keyExtractor={item => item && item.id && item.id.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={handleEndReached}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            ListFooterComponent={loading && <ActivityIndicator />}
          />
        </ListContainer>
      </Content>
    </Container>
  );
}
