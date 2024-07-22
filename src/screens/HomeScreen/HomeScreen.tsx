import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { CardItem } from '../../components';
import { useWebsocket } from '../../hooks';
import { Container, Content } from './styles';

export const HomeScreen = () => {
  const { dataRealTime, loading } = useWebsocket();

  return (
    <Container>
      {loading && (
        <Content>
          <ActivityIndicator color="#343434" size="large" />
        </Content>
      )}

      {!loading && (
        <FlatList
          data={dataRealTime}
          renderItem={({ item }) => (
            <CardItem
              id={item.id}
              userId={item.userId}
              title={item.title}
              body={item.body}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </Container>
  );
};
