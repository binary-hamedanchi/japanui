import socketConfig from 'config/socket.json';

socketConfig.url = getSocketURL();


function getSocketURL() {
  let serverUrl = localStorage.getItem('config.server_url');
  if (!serverUrl) {
    serverUrl = (/staging\.binary\.com/i.test(window.location.hostname) ? 'www2' : 'ws') + '.binaryws.com';
  }
  // return 'wss://' + server_url + '/websockets/v3';
  return 'wss://www.binaryqa15.com/websockets/v3';
}

export default socketConfig;
