import socketConfig from 'config/socket.json';

let config = socketConfig;
if (typeof window.getSocketURL === 'function') {
  config = Object.assign({}, socketConfig, { url: window.getSocketURL() });
}

// console.log(socketConfig.url);

export default config;
