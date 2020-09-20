import io from 'socket.io-client';
import { BASE_URL } from 'constants/apiConstants';
import { useEffect, useState } from 'react';

const useLiveData = () => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const socket = io(`${BASE_URL}/watch`);
    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
    socket.emit('sub', { state: true });
    socket.on('data', (res: string, cb: (ack: number) => void) => {
      setData((prevState: any) => [...prevState, res]);
      const CLIENT_ACKNOWLEDGEMENT = 1;
      cb(CLIENT_ACKNOWLEDGEMENT);
    });
    socket.on('error', (res: string) => {
      console.log('error', res);
      setError(res);
    });

    return () => {
      socket.emit('unsub', { state: false });
    };
  }, []);
  return [data, error];
};

export default useLiveData;
