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

  _overridingStyles() {
    const defaultWidth = Math.min(window.innerWidth * 0.9, 500);
    return {
      Containers: {
        DefaultStyle: {
          width: defaultWidth,
          margin: '0 auto',
        },
        tc: {
          top: '112px',
          marginLeft: -(defaultWidth / 2),
          padding: '0',
        }
      },
      NotificationItem: {
        DefaultStyle: {
          border: '2px solid #2a3052',
          borderRadius: '0',
          color: '#000',
          backgroundColor: '#FEF1CF',
          textAlign: 'center',
          fontSize: '14px',
          lineHeight: '25px',
          padding: '10px 26px',
          margin: '0',
          WebkitBoxShadow: 'none',
          MozBoxShadow: 'none',
          boxShadow: 'none',
        },
      },
      MessageWrapper: {
        DefaultStyle: {
          display: 'inline-block',
        },
      },
      ActionWrapper: {
        DefaultStyle: {
          display: 'inline-block',
        },
      },
      Action: {
        DefaultStyle: {
          backgroundColor: 'transparent',
          borderRadius: '0',
          padding: '0 5px',
          margin: '0',
          color: '#2A3052',
          textDecoration: 'underline',
          fontSize: '1em',
          lineHeight: '25px',
        },
      },
      Dismiss: {
        DefaultStyle: {
          top: '0px',
          right: '0px',
          backgroundColor: '#2a3052',
          color: '#fff',
          borderRadius: '0',
          width: '24px',
          height: '24px',
          lineHeight: '24px',
          fontSize: '24px',
          fontWeight: 'normal',
          textAlign: 'center',
        },
      },
    };
  }

  render() {
    return <NotificationSystem ref='notificationSystem' style={this._overridingStyles()} />;
  }
}
