import React from 'react';
import { List, Map } from 'immutable';

import InputBlock from './InputBlock';
import Select from './Select';
import text from '../helpers/text';

const SymbolSelectContainer = (props) => (<InputBlock
  heading={text('FX Rate')}>
    <Select {...props}
      className='select' options={props.state.getIn(['values', 'symbols'], List())}/>
  </InputBlock>);

SymbolSelectContainer.displayName = 'SymbolSelectContainer';
SymbolSelectContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default SymbolSelectContainer;
