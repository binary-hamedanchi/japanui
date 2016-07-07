import React from 'react';
import { Map } from 'immutable';
import classNames from 'classnames';

const Barriers = ({ table, title }) => {
  const barriers = table.first().keySeq().sort((barrie1, barrier2) => barrie1 > barrier2 ? -1 : 1);
  const rows = barriers.map((barrier, key) => {
    const barrierName = barrier.replace('_', ' - ');
    return (<div key={key} className='row'>
      <div className={classNames('barrier', 'col')}>{barrierName}</div>
    </div>);
  }).toArray();

  rows.unshift(<div key='barriers-title' className='row'>
    <div className={classNames('barrier', 'col', 'heading')}>{title}</div>
  </div>);

  return <div className='col'>{rows}</div>;
};

Barriers.displayName = 'Barriers';
Barriers.propTypes = {
  table: React.PropTypes.instanceOf(Map).isRequired,
  title: React.PropTypes.string.isRequired,
};

export default Barriers;
