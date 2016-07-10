import React from 'react';
import { List, Map } from 'immutable';

import JapanTableCol from './JapanTableCol';

const JapanTable = ({ table, text }) => {
  return (<div className='japan-table'>
  {table.map((item, key) => {
    if(!item.get('contractType')){
      console.log(item.toJS());
    }
    return <JapanTableCol
    prices={item.get('prices')}
    type={item.get('contractType')}
    key={key}
    text={text} />})}
</div>)};

JapanTable.displayName = 'JapanTable';
JapanTable.propTypes = {
  table: React.PropTypes.instanceOf(List).isRequired,
  text: React.PropTypes.instanceOf(Map).isRequired,
};

export default JapanTable;
