import React from 'react';
import { Map, List } from 'immutable';

import JapanColDescription from './JapanColDescription';
import JapanTableRow from './JapanTableRow';

const JapanTableCol = ({ list, type, text, buyCb }) => (<div className='col'>
  <JapanColDescription
    key='description'
    text={text}
    type={type} />
  <JapanTableRow
    key='heading'
    item={Map({
      barrier: text.get('textBarrier'),
      buy: text.get('textBuy'),
      sell: text.get('textSell'),
    })} />
  {list.map((item, key) => (
    <JapanTableRow
      key={key}
      item={item.set('cb', () => buyCb({ barrier: item.get('barrier'), type }))} />
  ))}
</div>);

JapanTableCol.displayName = 'JapanTableCol';
JapanTableCol.propTypes = {
  list: React.PropTypes.instanceOf(List).isRequired,
  type: React.PropTypes.string.isRequired,
  text: React.PropTypes.instanceOf(Map).isRequired,
  buyCb: React.PropTypes.func.isRequired,
};

export default JapanTableCol;
