import React from 'react';
import { List, Map } from 'immutable';

import SymbolsHelper from '../helpers/SymbolsHelper';
import SelectBlock from './SelectBlock';
import text from '../helpers/text';

const getSymbols = (state = Map()) => {
  const symbols = state.get('symbols', List());

  return SymbolsHelper.getSymbols(symbols, 'major_pairs')
  // return SymbolsHelper.getSymbols(symbols, 'volidx')
    .toList()
    .map((symbol) => List.of(symbol.get('symbol'), symbol.get('display_name')));
};

const SymbolSelectContainer = (props) => (<SelectBlock
  {...props}
  heading={text('FX Rate')}
  options={getSymbols(props.state)} />);

SymbolSelectContainer.displayName = 'SymbolSelectContainer';
SymbolSelectContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default SymbolSelectContainer;
