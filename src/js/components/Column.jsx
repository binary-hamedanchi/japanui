import React from 'react';
import { Map } from 'immutable';
import classNames from 'classnames';

const Column = ({ list, type, buy, sell }) => {
  const barriers = list.keySeq().sort((barrie1, barrier2) => barrie1 > barrier2 ? -1 : 1);
  const rows = barriers.map((barrier, key) => {
    const askInactive = { inactive: list.getIn([barrier, 'ask', 'inactive']) };
    const bidInactive = { inactive: list.getIn([barrier, 'bid', 'inactive']) };

    return (<div key={key} className='row'>
      <div className={classNames('ask-price', 'col', askInactive)}>
        ¥{list.getIn([barrier, 'ask', 'value'])}</div>
      <div className={classNames('bid-price', 'col', bidInactive)}>
        ¥{list.getIn([barrier, 'bid', 'value'])}</div>
    </div>);
  }).toArray();

  rows.unshift(<div key={`${type}-heading`} className='row'>
    <div className={classNames('ask-price', 'col', 'heading')}>{buy}</div>
    <div className={classNames('bid-price', 'col', 'heading')}>{sell}</div>
  </div>);

  return <div className='col'>{rows}</div>;
};

Column.displayName = 'Column';
Column.propTypes = {
  list: React.PropTypes.instanceOf(Map).isRequired,
  type: React.PropTypes.string.isRequired,
};

export default Column;
