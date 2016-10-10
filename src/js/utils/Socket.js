import SocketQueue from './Socket/SocketQueue';
import SocketStream from './Socket/SocketStream';
import SocketCache from './Socket/SocketCache';
import SocketTimer from './Socket/SocketTimer';

export default class Socket {

  constructor(parameters = {}) {
    if (!parameters.url) {
      throw TypeError('Failed to construct \'Socket\': url not provided.');
    }

    this.url = parameters.url;

    this._queue = new SocketQueue();
    this._cache = new SocketCache(parameters.cacheExpiry);

    const checkTimeout = parameters.checkTimeout || 5;
    const pingTimeout = parameters.pingTimeout || 2;

    this._timers = {
      check: new SocketTimer(checkTimeout, () => this._onCheckTimerExpiry()),
      ping: new SocketTimer(pingTimeout, () => this._onPingTimerExpiry()),
    };

    this.open();
    return this;
  }

  _onPingTimerExpiry() {
    this._onclose();
    this.ws.close();
  }

  _onCheckTimerExpiry() {
    this._sendPing();
  }

  open() {
    if (!this.ws || (this.ws.readyState !== 0 && this.ws.readyState !== 1)) {
      this.ws = new WebSocket(this.url);
      this._bindWsEvents();
      this.status = 'opening';
    }

    return this;
  }

  _bindWsEvents() {
    this.ws.onopen = () => this._onopen();
    this.ws.onmessage = (msg) => this._onmessage(msg);
    this.ws.onclose = () => this._onclose();

    return this;
  }

  _onopen() {
    const prevStatus = this.status;

    this.status = 'opened';

    this._timers.check.start();

    this._resend();

    if (prevStatus === 'opening' && typeof this.onOpen === 'function') {
      this.onOpen();
    } else if (prevStatus === 'reopening' && typeof this.onReopen === 'function') {
      this.onReopen();
    }

    return;
  }

  _onclose() {
    if (!this.isClosed && this.ws.readyState !== 0 && this.ws.readyState !== 1) {
      this.reconCounter = this.reconCounter ? this.reconCounter + 1 : 1;
      this.open();
      this.status = 'reopening';
      if (typeof this.onLost === 'function') {
        this.onLost();
      }
    } else if (this.isClosed) {
      this.status = 'closed';

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }

    return;
  }

  _onmessage(msg) {
    this._timers.ping.stop();
    this._timers.check.restart();

    const res = JSON.parse(msg.data);
    this._processResponse(res);
    this._cache.put(res.echo_req, res);

    return;
  }

  _processResponse(res) {
    const result = this._queue.get(res.echo_req);

    const isStream = this._queue.isStream(res.echo_req);
    if (result) {
      if (!isStream && res.error) {
        result.reject(res.error);
      } else if (!isStream && !res.error) {
        result.resolve(res[res.msg_type]);
      } else if (isStream && res.error) {
        result.error(Object.assign({}, { isError: true }, res.error));
      } else if (isStream && !res.error) {
        result.push(res[res.msg_type]);
      }
    }
    return;
  }

  _bindResultEvents(result) {
    if (result instanceof SocketStream) {
      result.on('end', (err) => {
        this._queue.remove(result.id);
        // if (!err) {
        //   result.wsID.then((id) => this._forgetStream(id));
        // }
      });
    } else {
      result.then(() => this._queue.remove(result.id)).catch(() => this._queue.remove(result.id));
    }
  }

  _resend() {
    this._queue.getList().forEach((req) => this.send(req));

    return this;
  }

  _sendPing() {
    if (this.ws.readyState === 1) {
      this._timers.ping.start();
      this.ws.send(JSON.stringify({ ping: 1 }));
    }

    return this;
  }

  _forgetStream(id) {
    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify({ forget: id }));
    }
    return this;
  }

  send(req) {
    const { action, wasInQueue } = this._queue.add(req);

    let result = action;
    if (!wasInQueue) {
      this._bindResultEvents(result);
    }

    if (result instanceof SocketStream) {
      result = result.through();
    }

    const cached = this._cache.get(req);

    if (cached) {
      this._processResponse(cached);
    } else if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(req));
    }

    return result;
  }

  request(...args) {
    return this.send(...args);
  }

  stream(...args) {
    return this.send(...args);
  }

  close() {
    this.status = 'closing';

    this.isClosed = 1;
    Object.keys(this._timers).forEach((timer) => this._timers[timer].stop());
    this.ws.close();
  }
}
