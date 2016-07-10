import React from 'react';
import classNames from 'classnames';

const JapanTableRow = ({
  barrier,
  buy,
  buyClasses,
  sell,
  sellClasses,
  isHeading,
}) => (<div className={classNames('row', { heading: isHeading })}>
  <div className='barrier col'>{barrier}</div>
  <div className={classNames('col', 'buy', buyClasses)}>{buy}</div>
  <div className={classNames('col', 'sell', sellClasses)}>{sell}</div>
</div>);


JapanTableRow.displayName = 'JapanTableRow';
JapanTableRow.propTypes = {
  barrier: React.PropTypes.string.isRequired,
  buy: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string,
  ]),
  buyClasses: React.PropTypes.string,
  sell: React.PropTypes.string,
  sellClasses: React.PropTypes.string,
  isHeading: React.PropTypes.bool,
};

export default JapanTableRow;
