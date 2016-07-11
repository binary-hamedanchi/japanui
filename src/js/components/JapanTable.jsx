import React from 'react';
import { List, Map } from 'immutable';

import JapanTableCol from './JapanTableCol';

const JapanTable = ({
  table,
  symbol,
  period,
  payout,
  text,
  buyCb,
}) => (<div className='japan-table'>
  {table.map((item, key) => (<JapanTableCol
    buyCb={buyCb}
    prices={item.get('prices')}
    type={item.get('contractType')}
    symbol={symbol}
    period={period}
    payout={payout}
    key={key}
    text={text} />))}
</div>);

JapanTable.displayName = 'JapanTable';
JapanTable.propTypes = {
  table: React.PropTypes.instanceOf(List).isRequired,
  text: React.PropTypes.instanceOf(Map).isRequired,
  symbol: React.PropTypes.string,
  period: React.PropTypes.string,
  payout: React.PropTypes.string,
  buyCb: React.PropTypes.func.isRequired,
};

export default JapanTable;
