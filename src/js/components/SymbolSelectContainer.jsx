import React from 'react';
import { List, Map } from 'immutable';

import SelectBlock from './SelectBlock';
import text from '../helpers/text';

const SymbolSelectContainer = (props) => (<SelectBlock
  {...props}
  heading={text('FX Rate')}
  options={props.state.getIn(['values', 'symbols'], List())} />);

SymbolSelectContainer.displayName = 'SymbolSelectContainer';
SymbolSelectContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default SymbolSelectContainer;
