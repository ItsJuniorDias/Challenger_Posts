import React, { useEffect, useState } from 'react';

export type DataProps = {
  body: string;
  id: number;
  title: string;
  userId: number;
}[];

export const useWebsocket = () => {
  const server = new WebSocket('https://echo.websocket.org/');

  const [data, setData] = useState<DataProps>([]);
  const [loading, setLoading] = useState(true);

  const [dataRealTime, setDataRealTime] = useState<DataProps>([]);

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    server.addEventListener('open', () => {
      server.send(JSON.stringify(data));
    });

    server.addEventListener('message', (event) => {
      setDataRealTime(JSON.parse(event.data));

      setLoading(false);
    });
  }, [data]);

  return {
    data,
    dataRealTime,
    loading,
    server,
  };
};
