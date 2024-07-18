import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Container, Title, Content, Body } from './styles';

export type ItemProps = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type DataProps = {
  body: string;
  id: number;
  title: string;
  userId: number;
}[];

export const HomeScreen = () => {
  const [data, setData] = useState<DataProps>([]);
  const [loading, setLoading] = useState(true);

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        setData(json);

        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const Item = ({ id, userId, title, body }: ItemProps) => (
    <Content activeOpacity={0.7}>
      <Title numberOfLines={1}>{title}</Title>
      <Body numberOfLines={3}>{body}</Body>
    </Content>
  );

  console.log(data, 'DATA');

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            userId={item.userId}
            title={item.title}
            body={item.body}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  );
};
