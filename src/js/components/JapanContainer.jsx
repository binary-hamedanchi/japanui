import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';
import React from 'react';
import FetchingContainer from './FetchingContainer';
import FormContainer from './FormContainer';
import TableContainer from './TableContainer';
import { Map } from 'immutable';

const Japan = ({ state, actions }) => {
  return (<div className='japan-ui'>
    <FetchingContainer state={state} />
    <FormContainer state={state} actions={actions} />
    <TableContainer state={state} />
  </div>);
};

Japan.displayName = 'Japan';
Japan.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
  actions: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

const JapanContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Japan);

export default JapanContainer;
