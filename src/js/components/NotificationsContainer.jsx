import React from 'react';

export default class NotificationsContainer extends React.Component {
  static displayName() {
    return 'NotificationsContainer';
  }

  render() {
    const { state } = this.props;
    return (
        <div className="gr-padding-10 gr-parent">
            <div className="notice-msg center-text">
                {state.getIn(['notification', 'message'])}
                {' '}
                <a onClick={state.getIn(['notification', 'action', 'callback'])}>
                    {state.getIn(['notification', 'action', 'label'])}
                </a>
            </div>
        </div>
    );
  }
}
