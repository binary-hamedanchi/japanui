import React from 'react';
import { Map } from 'immutable';

const FetchingContainer = ({ state }) => {
  if (state.getIn(['status', 'symbols']) !== 'pending' &&
    state.getIn(['status', 'contracts']) !== 'pending' &&
    (!state.getIn(['streams', 'proposals'], Map()).isEmpty() ||
      !state.getIn(['errors', 'proposals'], Map()).isEmpty())) {
    return null;
  }

  return <div className='data-fetching'>fetching...</div>;
};


FetchingContainer.displayName = 'FetchingContainer';
FetchingContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default FetchingContainer;
