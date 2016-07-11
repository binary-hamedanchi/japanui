import { connect } from 'react-redux';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import React from 'react';

import * as Actions from '../actions/Actions';
import FetchingBoxContainer from './FetchingBoxContainer';
import JapanTableContainer from './JapanTableContainer';
import JapanForm from './JapanForm';

const Japan = ({ state, actions }) => (<div className='japan-ui'>
  <FetchingBoxContainer state={state} />
  <JapanForm state={state} actions={actions}/>
  <JapanTableContainer state={state}/>
</div>);

Japan.displayName = 'Japan';
Japan.propTypes = {
  actions: React.PropTypes.object.isRequired,
  state: React.PropTypes.instanceOf(Map).isRequired,
};

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

const JapanContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Japan);

JapanContainer.displayName = 'JapanContainer';

export default JapanContainer;
