import React from 'react';
import { Map } from 'immutable';
import JapanPriceButton from './JapanPriceButton';
import JapanPrice from './JapanPrice';

const JapanPriceContainer = ({ price, cb, isActive, message }) => {
  if (!price) {
    return null;
  }

  const arrows = { '-1': '⬇', 1: '⬆', 0: '' };
  const dyn = parseInt(price.get('dynamics', 0), 10);
  const dynamics = arrows[dyn];

  if (cb) {
    return (<JapanPriceButton
      price={Number(price.get('val')).toLocaleString()}
      cb={isActive ? cb : () => {}}
      dynamics={dynamics}
      inactive={!isActive}
      message={message} />);
  }

  return (<JapanPrice
    price={Number(price.get('val')).toLocaleString()}
    dynamics={dynamics}
    inactive={!isActive} />);
};

JapanPriceContainer.displayName = 'JapanPriceContainer';
JapanPriceContainer.propTypes = {
  price: React.PropTypes.instanceOf(Map),
  cb: React.PropTypes.func,
  isActive: React.PropTypes.bool,
  message: React.PropTypes.string,
};

export default JapanPriceContainer;
