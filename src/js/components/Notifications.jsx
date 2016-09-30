import React from 'react';
import NotificationSystem from 'react-notification-system';
import { Map } from 'immutable';

export default class Notifications extends React.Component {
  static displayName() {
    return 'NotificationsContainer';
  }

  static propTypes() {
    return { state: React.PropTypes.instanceOf(Map).isRequired };
  }

  constructor() {
    const _this = super();
    _this._notificationSystem = null;

    return _this;
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.state.get('notification') !== this.props.state.get('notification');
  }

  componentDidUpdate() {
    const notification = this.props.state.get('notification', Map());
    if (typeof notification.get('state') !== 'undefined') {
      if (notification.get('state')) {
        this._addNotification(notification);
      } else if (notification.has('uid')) {
        this._delNotification(notification);
      }
    }
  }

  _addNotification(notification) {
    this._notificationSystem.addNotification(Object.assign({},
      notification.toJS(), { position: 'tc' }));
  }

  _delNotification(notification) {
    this._notificationSystem.removeNotification(notification.get('uid'));
  }

  render() {
    return <NotificationSystem ref='notificationSystem' />;
  }
}
