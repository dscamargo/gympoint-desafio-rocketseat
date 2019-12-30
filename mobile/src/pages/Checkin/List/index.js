import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList, ActivityIndicator} from 'react-native';
import {formatDistance} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Header from '~/components/Header';
import Button from '~/components/Button';

import CheckinActions from '~/store/ducks/checkins';
const {checkinsListRequest, checkinsNewRequest} = CheckinActions;

import {
  Container,
  Content,
  ListContainer,
  ListContent,
  CheckinNumber,
  CheckinDate,
} from './styles';

export default function List({navigation}) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const user_id = useSelector(state => state.me.user_id);
  const loading = useSelector(state => state.checkins.loading);
  const last_page = useSelector(
    state => state.checkins.meta && state.checkins.meta.last_page,
  );
  const checkins = useSelector(
    state => state.checkins && state.checkins.checkins,
  );

  function handleNewCheckin() {
    if (user_id) {
      dispatch(checkinsNewRequest({id: user_id, setPage}));
    }
  }

  useEffect(() => {
    dispatch(checkinsListRequest({id: user_id, page}));
  }, [dispatch, page, user_id]);

  function renderCheckins(item) {
    return (
      <ListContent>
        <CheckinNumber>Checkin #{item.id}</CheckinNumber>
        <CheckinDate>
          {formatDistance(new Date(item && item.createdAt), new Date(), {
            locale: pt,
          })}
        </CheckinDate>
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
  }

  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <Button label="Novo check-in" onPress={handleNewCheckin} />
        <ListContainer>
          <FlatList
            data={checkins}
            renderItem={({item}) => renderCheckins(item)}
            keyExtractor={item => item && item.id && item.id.toString()}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loading && <ActivityIndicator />}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        </ListContainer>
      </Content>
    </Container>
  );
}
