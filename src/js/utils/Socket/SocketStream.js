import { Readable } from 'stream';
import ps from 'promise-streams';

export default class SocketStream extends Readable {
  constructor(id) {
    const stream = super({ objectMode: true });
    stream.id = id;
    let resolve;

    const promise = new Promise((res) => {
      resolve = res;
    });
    promise.resolve = resolve;

    stream.wsID = promise;
    return stream;
  }

  push(res) {
    let result;
    if (!this._isClosed) {
      if (res && res.id) {
        this.wsID.resolve(res.id);
      }
      result = super.push(res);
    }

    return result;
  }

  error(res) {
    this.push(res);
    this.close(res);
  }

  close(err) {
    this._isClosed = true;
    return this.emit('end', err);
  }

  _read() {}

  through() {
    const through = ps.through({ writable: false, allowHalfOpen: false },
      (data) => {
        return through.push(data);
      });

    const piped = this.pipe(through);
    piped.close = (a) => this.close(a);
    return piped;
  }
}

require('events').EventEmitter.prototype._maxListeners = 100;

