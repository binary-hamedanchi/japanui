import socketConfig from 'config/socket.json';

if (typeof window.getSocketURL === 'function') {
  socketConfig.url = window.getSocketURL();
}

console.log(socketConfig.url);

export default socketConfig;
