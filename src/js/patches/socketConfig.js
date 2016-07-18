import socket from 'config/socket.json';

const socketConfig = () => {
  if (typeof window.getSocketURL === 'function') {
    socket.url = window.getSocketURL();
  }

  return socket;
};

export default socketConfig;
