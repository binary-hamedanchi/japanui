import React from 'react';
import classNames from 'classnames';

const JapanPrice = ({ price, dynamics, inactive }) => (
  <span className={classNames('price-wrapper', { inactive: inactive })}>
    {price}<span className='dynamics'>{dynamics}</span></span>
);

JapanPrice.displayName = 'JapanPrice';
JapanPrice.propTypes = {
  price: React.PropTypes.string.isRequired,
  dynamics: React.PropTypes.string,
  inactive: React.PropTypes.bool,
};

export default JapanPrice;
