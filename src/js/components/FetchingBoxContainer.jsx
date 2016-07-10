import React from 'react';
import { List, Map } from 'immutable';

import FetchingBox from './FetchingBox';

const FetchingBoxContainer = ({ state }) => {
  if (state.get('symbols', List()).isEmpty() ||
    state.get('contracts', Map()).isEmpty() ||
    (state.getIn(['streams', 'proposals'], Map()).isEmpty() &&
      state.getIn(['errors', 'proposals'], Map()).isEmpty())) {
    return <FetchingBox />;
  }

  return null;
};


FetchingBoxContainer.displayName = 'FetchingBoxContainer';
FetchingBoxContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default FetchingBoxContainer;
