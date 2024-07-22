import React, { useEffect, useReducer, useState } from 'react';

export enum WebSocketActionEnum {
  FETCH = 'FETCH',
  LOADING = 'LOADING',
  DATA_REAL_TIME = 'DATA_REAL_TIME',
}

export type WebSocketAction = {
  type: 'FETCH' | 'LOADING' | 'DATA_REAL_TIME';
  payload?: {};
};

export type DataProps = {
  body: string;
  id: number;
  title: string;
  userId: number;
}[];

export type WebSocketState = {
  data: DataProps;
  dataRealTime: DataProps;
  loading?: boolean;
};

const reducer = (
  state: WebSocketState,
  action: WebSocketAction
): WebSocketState => {
  const { type, payload } = action;

  switch (type) {
    case WebSocketActionEnum.FETCH:
      return {
        ...state,
        ...payload,
      };
    case WebSocketActionEnum.LOADING:
      return {
        ...state,
        ...payload,
      };
    case WebSocketActionEnum.DATA_REAL_TIME:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export const useWebsocket = () => {
  const server = new WebSocket('https://echo.websocket.org/');

  const [state, dispatch] = useReducer(reducer, {
    data: [],
    dataRealTime: [],
    loading: true,
  });

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: 'FETCH',
          payload: {
            data: json,
          },
        });
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    server.addEventListener('open', () => {
      server.send(JSON.stringify(state.data));
    });

    server.addEventListener('message', (event) => {
      dispatch({
        type: 'FETCH',
        payload: {
          dataRealTime: JSON.parse(event.data),
        },
      });

      dispatch({
        type: 'LOADING',
        payload: {
          loading: false,
        },
      });
    });
  }, [state.data]);

  return {
    state,
    server,
  };
};
