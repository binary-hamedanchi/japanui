import { Map } from 'immutable';

const Storage = ({ getState }) => (next) => (action) => {
  const result = next(action);

  if (action.payload && action.payload.store) {
    localStorage.setItem('japan', JSON.stringify(getState().get('storage', Map()).toJS()));
  }
  return result;
};

export default Storage;
