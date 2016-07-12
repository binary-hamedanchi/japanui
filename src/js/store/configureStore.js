import configureStoreProduction from './configureStoreProduction';
import configureStoreDevelopment from './configureStoreDevelopment';

let configureStore;
switch (process.env.NODE_ENV) {
  case 'production':
    configureStore = configureStoreProduction;
    break;
  case 'development':
    configureStore = configureStoreDevelopment;
    break;
  default:
    break;
}

export default configureStore;
