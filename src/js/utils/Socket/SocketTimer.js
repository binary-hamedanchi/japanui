export default class SocketTimer {
  constructor(timeout, cb) {
    this.timeout = timeout * 1000;
    this.cb = cb;
    this.status = 'stoped';
    return this;
  }

  start() {
    this._timer = setTimeout(() => {
      this.status = 'finished';
      this.cb();
    }, this.timeout);
    this.status = 'started';
    return this;
  }

  stop() {
    clearInterval(this._timer);
    this.status = 'stoped';
    return this;
  }

  restart() {
    this.stop();
    this.start();
  }
}

