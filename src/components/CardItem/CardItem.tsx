import React from 'react';
import { View } from 'react-native';

import { Content, Title, Body } from './styles';

export type CardItemProps = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export const CardItem = ({ id, userId, title, body }: CardItemProps) => {
  return (
    <Content activeOpacity={0.7}>
      <Title numberOfLines={1}>{title}</Title>
      <Body numberOfLines={3}>{body}</Body>
    </Content>
  );
};
