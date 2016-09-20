import React from 'react';
import classNames from 'classnames';
import { Map } from 'immutable';

const Notifications = ({state}) => (
  <div className={classNames({invisible: !state.has('notification')}, 'gr-padding-10', 'gr-parent')}>
      <div className={classNames('notice-msg', 'center-text')}>
          {state.getIn(['notification', 'message'])}
          {' '}
          <a onClick={state.getIn(['notification', 'action', 'callback'])}>
              {state.getIn(['notification', 'action', 'label'])}
          </a>
      </div>
  </div>
);

Notifications.displayName = 'Notifications';
Notifications.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default Notifications;


