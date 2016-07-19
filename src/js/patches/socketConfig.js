import socket from 'config/socket.json';

const socketConfig = () => {
  if (typeof window.getSocketURL === 'function' &&
    typeof window.getAppId === 'function' &&
    typeof window.page === 'object' &&
    typeof window.page.language === 'function') {
    const url = window.getSocketURL();
    const appId = window.getAppId();
    const language = window.page.language() ? `&l=${window.page.language()}` : '';

    socket.url = `${url}?app_id=${appId}${language}`;
  }

  return socket;
};

export default socketConfig;
