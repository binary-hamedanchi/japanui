import React from 'react';
import classNames from 'classnames';

const JapanTableRow = ({ barrier, buy, sell, buyCb }) => (
  <div className={classNames('row', { heading: Boolean(buyCb) })}>
  <div className='barrier col'>{barrier}</div>
  <div className='buy col'>{buyCb ? <button onClick={buyCb}>{buy}</button> : buy}</div>
  <div className='barrier sell'>{sell}</div>
</div>);

JapanTableRow.displayName = 'JapanTableRow';
JapanTableRow.propTypes = {
  barrier: React.PropTypes.string.isRequired,
  buy: React.PropTypes.string.isRequired,
  sell: React.PropTypes.string.isRequired,
  buyCb: React.PropTypes.func,
};

export default JapanTableRow;
