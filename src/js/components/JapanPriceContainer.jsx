import React from 'react';
import { Map } from 'immutable';
import JapanPriceButton from './JapanPriceButton';
import JapanPrice from './JapanPrice';

const JapanPriceContainer = ({ price, cb }) => {
  if (!price) {
    return null;
  }

  const arrows = { '-1': '⬇', 1: '⬆', 0: '' };
  const dyn = parseInt(price.get('dynamics', 0), 10);
  const dynamics = arrows[dyn];

  if (cb) {
    return <JapanPriceButton price={String(price.get('val'))} cb={cb} dynamics={dynamics}/>;
  }

  return <JapanPrice price={String(price.get('val'))} dynamics={dynamics}/>;
};

JapanPriceContainer.displayName = 'JapanPriceContainer';
JapanPriceContainer.propTypes = {
  price: React.PropTypes.instanceOf(Map),
  cb: React.PropTypes.func,
};

export default JapanPriceContainer;
