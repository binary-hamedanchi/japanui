import hash from 'object-hash';

import SocketStream from './SocketStream';
import SocketPromise from './SocketPromise';

export default class SocketQueue {
  constructor() {
    this.clean();
    this._order = 1;
    return this;
  }

  add(req = {}) {
    const id = hash(req);

    let wasInQueue = true;

    if (!this.has(req)) {
      wasInQueue = false;

      this.queue[id] = {
        order: this._order++,
        req,
      };

      if (this.isStream(req)) {
        this.queue[id].stream = new SocketStream(id);
      } else {
        this.queue[id].promise = new SocketPromise(id);
      }
    }
    return {
      action: this.queue[id].promise || this.queue[id].stream,
      wasInQueue,
    };
  }

  get(req = {}) {
    const id = hash(req);
    return this.queue[id] ? (this.queue[id].promise || this.queue[id].stream) : undefined;
  }

  remove(id = '') {
    delete this.queue[id];
    return;
  }

  getList() {
    const reqs = Object.keys(this.queue)
      .sort((key1, key2) => this.queue[key1].order - this.queue[key2].order)
      .map((key) => this.queue[key].req);

    return reqs;
  }

  has(req = {}) {
    return this.queue[hash(req)] !== undefined;
  }

  clean() {
    this.queue = {};
    return this;
  }

  isStream(req = {}) {
    return req.hasOwnProperty('subscribe');
  }
}

